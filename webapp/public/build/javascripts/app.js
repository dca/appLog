/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('ml', [
    'ngResource',
    'elasticjs.service',
    'btford.socket-io'
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


    ejs.query().then(function(data) {

        var logs = data.hits.hits || [];
        logs.forEach(function(log){
            logPush(log._source);
        });

        $scope.total = data.hits.total;
        setTimeout(function(){
            logsTable.scrollTop = logsTable.scrollHeight;
        }, 1000);

    });


    socket.on('log', function (log) {
        logPush(log);
        $scope.total++;

        logsTable.scrollTop = logsTable.scrollHeight;
    });

    var mapColor = {
        'ERROR' : 'danger',
        'WARNING' : 'warning'
    };

    function logPush (log) {
        log.rowColorClass = mapColor[log.level] || '';
        $scope.logs.push(log);
    }

});

'use strict';

angular.module('ml').

factory('ejs', function(
    $q,
    $http,
    ejsResource
){

    var ejs = ejsResource('http://localhost:9200');
    var index = 'dca';
    var type = 'logger_test';

    var ES = ejs.Request().indices(index).types(type);

    function query(argument) {
        var _result = {};
        _result = ES
            .query( ejs.MatchAllQuery() )
            .size(100)
            .sort('time', 'desc')
            .doSearch();
        return _result;
    }



    return {
        query : query
    };
});
