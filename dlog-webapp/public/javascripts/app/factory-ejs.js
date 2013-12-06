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

        var ES  = new ESQuery;
        var _queryStr = args.queryStr ? ejs.MatchQuery( 'message', args.queryStr ) : ejs.MatchAllQuery();
        var _time = ejs.RangeFilter('time')

        if (args.timeStart) {
            var _start = moment(args.timeStart).valueOf();
            _time=_time.gte(_start);
        }
        if (args.timeEnd) {
            var _end = moment(args.timeEnd).valueOf();
            _time=_time.lte(_end);
        }

        return  ES
            .query( _queryStr )
            .filter( ejs.AndFilter([
                ejs.QueryFilter( ejs.FieldQuery('level', genQueryByTrue(args.level) ) ),
                ejs.QueryFilter( ejs.FieldQuery('service', genQueryByTrue(args.service)) ),
                _time
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

    // function eSearch(args) {
    //     this.args = args || {};
    //     this.ejs  = ejs.Request().indices(index).types(type);
    // }
    // eSearch.prototype.search = function search(){
    //     return this.ejs.doSearch();
    // }

    // eSearch.prototype.sort = function sort(){
    //     this.ejs = this.ejs.sort('time', 'desc');
    //     return this;
    // }

    // eSearch.prototype.limit = function limit(){
    //     var _limit = this.args.size || 10;
    //     this.ejs = this.ejs.size(_limit);
    //     return this;
    // }

    // eSearch.prototype.timeStart = function timeStart(){
    //     var _start = moment(args.timeStart).valueOf();
    //     this.RangeTime = this.RangeTime || ejs.RangeFilter('time');
    //     this.RangeTime = this.RangeTime.gte( this.args.timeStart );
    //     return this;
    // }
    // eSearch.prototype.timeEed = function timeEed(){
    //     var _start = moment(args.timeEnd).valueOf();
    //     this.RangeTime = this.RangeTime || ejs.RangeFilter('time');
    //     this.RangeTime = this.RangeTime.lte( this.args.timeEnd );
    //     return this;
    // }

    return {
        query : query
    };
});
