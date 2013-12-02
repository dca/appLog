/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('ml', [
    'ngResource',
    'elasticjs.service',
    'btford.socket-io',
    'ui.bootstrap'
]).

config(function(
    socketProvider
){
    var mySocket = io.connect('http://localhost:9603');
      // do stuff with mySocket
    socketProvider.ioSocket(mySocket);
});

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

'use strict';

angular.module('ml').

factory('ejs', function(
    $q,
    $http,
    ejsResource
){

    var ejs     = ejsResource('http://localhost:9200');
    var index   = 'dca';
    var type    = 'logger_test';

    function ESQuery () {
        return ejs.Request().indices(index).types(type);
    }


    function query(args) {
        args = args || {};

        var     ES  = new ESQuery;
        return  ES
            .query( ejs.MatchAllQuery() )
            .filter( ejs.AndFilter([
                ejs.QueryFilter( ejs.FieldQuery('level', genQueryByTrue(args.level) ) ),
                ejs.QueryFilter( ejs.FieldQuery('service', genQueryByTrue(args.service)) )
            ]))
            .fields(['level', 'time', 'service', 'message', 'stackStr'])
            .sort('time', 'desc')
            .size(args.size || 10)
            .doSearch();
    }

    function genQueryByTrue (obj) {
        var _obj = [];
        angular.forEach(obj, function (value, key) {
            if (value) {
                _obj.push(key);
            }
        });
        return _obj.join(' or ');
    }

    return {
        query : query
    };
});
