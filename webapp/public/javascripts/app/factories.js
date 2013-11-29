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


    function query(argument) {
        var     ES  = new ESQuery;
        return  ES
            .query( ejs.MatchAllQuery() )
            .size(10)
            .sort('time', 'desc')
            .doSearch();
    }


    return {
        query : query
    };
});
