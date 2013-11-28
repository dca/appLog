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
