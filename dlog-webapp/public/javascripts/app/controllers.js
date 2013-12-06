'use strict';

angular.module('dlog').

controller('LoggerCtrl', function(
    $scope,
    ejs,
    socket,
    Logs
){


    $scope.logs = [];
    $scope.size = 100;

    $scope.predicate    = 'time';
    $scope.logReload    = reload;
    $scope.height       = window.innerHeight - 150;

    $scope.showLevel = {
        'error'   : true,
        'warning' : true,
        'info'    : true,
        'debug'   : true,
    };


    Logs.getService().then(function(service) {
        $scope.showService = service;
        reload();
    });


    socket.on('log', function (log) {
        Logs.new(log).then(function(res) {
            $scope.logs = res.logs;
            $scope.total = res.total;
        });

        jumpToBottom( document.querySelector('body') );
    });


    function reload () {
        Logs.update($scope).then(function(res) {
            $scope.logs = res.logs;
            $scope.total = res.total;
        });
    }

    function jumpToBottom (element) {
        element.scrollTop = element.scrollHeight;
        return ;
    }


});
