'use strict';

angular.module('dlog').

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
