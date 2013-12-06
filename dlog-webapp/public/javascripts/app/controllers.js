'use strict';

angular.module('dlog').

controller('LoggerCtrl', function(
    $scope,
    ejs,
    socket,
    Logs
){
    Logs.getService().then(function(service) {
        $scope.showService = service;
        reload();
    });

    var logsTable = document.querySelector('body');
    $scope.logs = [];
    $scope.size = 100;

    $scope.predicate = 'time';
    $scope.height = window.innerHeight - 150;

    // $scope.timeStart = '2013-12-01T00:00:00';
    // $scope.timeEnd   = '2013-12-05T00:00:00';



    $scope.showLevel = {
        'error'   : true,
        'warning' : true,
        'info'    : true,
        'debug'   : true,
    };

    $scope.logReload = reload;

    function reload () {
        console.log($scope);
        Logs.update($scope).then(function(res) {
            $scope.logs = res.logs;
            $scope.total = res.total;
        });
    }




    socket.on('log', function (log) {
        Logs.new(log).then(function(res) {
            $scope.logs = res.logs;
            $scope.total = res.total;
        });

        jumpToBottom(logsTable);
    });


    function jumpToBottom (element) {
        element.scrollTop = element.scrollHeight;
        return ;
    }


});
