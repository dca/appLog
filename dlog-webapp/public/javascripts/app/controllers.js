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
    $scope.size = 100;

    $scope.showService = {
        'admin'   : true,
        'system'  : true,
        'store'   : true,
        'facade'  : true,
        'express'     : true
    };
    $scope.showLevel = {
        'error'   : true,
        'warning' : true,
        'info'    : true,
        'debug'   : true,
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

    function jumpToBottom (element) {
        element.scrollTop = element.scrollHeight;
        return ;
    }

    $scope.logReloadAll = function logReloadAll () {
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




});
