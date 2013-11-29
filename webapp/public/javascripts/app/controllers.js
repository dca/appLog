'use strict';

angular.module('ml').

controller('LoggerCtrl', function(
    $scope,
    ejs,
    socket
){

    var logsTable = document.querySelector('body');

    $scope.logs = [];
    $scope.height = window.innerHeight - 150;

    $scope.predicate = 'time';
    $scope.size = 10;

    $scope.showService = {
        'meepshop-admin'   : true,
        'meepshop-system'  : true,
        'meepshop-store'   : true,
        'meepshop-facade'  : true,
    };
    $scope.showLevel = {
        error   : true,
        warning : true,
        info    : true,
        debug   : true,
    };

    ejs.query().then(function(data) {

        var logs = data.hits.hits || [];
        logs.forEach(function(log){
            logPush(log._source);
        });

        $scope.total = data.hits.total;
        setTimeout(function(){
            jumpToBottom(logsTable);
        }, 200);

    });


    socket.on('log', function (log) {
        logPush(log);
        $scope.total++;

        jumpToBottom(logsTable);
    });

    var mapColor = {
        'ERROR' : 'danger',
        'WARNING' : 'warning'
    };

    function logPush (log) {
        log.rowColorClass = mapColor[log.level] || '';
        $scope.logs.push(log);
    }

    function updateAllLogs (logs) {
        // body...
    }

    function addNewLog (log) {
        // body...
    }

    function jumpToBottom (element) {
        element.scrollTop = element.scrollHeight;
        return ;
    }

});
