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
        'admin'   : true,
        'system'  : true,
        'store'   : true,
        'facade'  : true,
        'express'     : true
    };
    $scope.showLevel = {
        'error'   : false,
        'warning' : true,
        'info'    : true,
        'debug'   : false,
    };

    var args = {
        level   : $scope.showLevel,
        service : $scope.showService,
        size    : $scope.size
    };

    ejs.query(args).then(function(data) {

        var logs = data.hits.hits || [];

        logs.forEach(function(log){
            log.fields && logPush(log.fields);
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

    function logReloadAll () {
        console.log('message');
        $scope.logs = [];

        var args = {
            level   : $scope.showLevel,
            service : $scope.showService,
            size    : $scope.size
        };

        ejs.query(args).then(function(data) {
            var logs = data.hits.hits || [];

            logs.forEach(function(log){
                log.fields && logPush(log.fields);
            });

            $scope.total = data.hits.total;
            setTimeout(function(){
                jumpToBottom(logsTable);
            }, 200);

        });
    }

    setTimeout(function(){
        $scope.$watch('size', logReloadAll);
        $scope.$watch('showLevel.error', logReloadAll );
        $scope.$watch('showLevel.warning', logReloadAll );
        $scope.$watch('showLevel.info', logReloadAll );
        $scope.$watch('showLevel.debug', logReloadAll );

        $scope.$watch('showService.admin', logReloadAll );
        $scope.$watch('showService.system', logReloadAll );
        $scope.$watch('showService.store', logReloadAll );
        $scope.$watch('showService.facade', logReloadAll );
        $scope.$watch('showService.express', logReloadAll );
    }, 1000);




});
