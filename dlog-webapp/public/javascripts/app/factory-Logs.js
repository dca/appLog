'use strict';

angular.module('dlog').

factory('Logs', function(
    ejs,
    $q
){
    function Logs () {
        this.logs = [];

        this.filter = {};
        this.query  = {};

        this.total = 0;
    }

    // Logs.prototype.setFilter = function(scope){
    //     this.filter = {
    //         'service' : scope.showService ,
    //         'level'   : scope.showLevel
    //     }

    //     return true;
    // }

    Logs.prototype.update = function(args){
        var defer = $q.defer();
        var _self = this;
        var _args = {
            level   : args.showLevel || {},
            service : args.showService || {},
            queryStr: args.queryStr || null,
            timeStart: args.timeStart || null,
            timeEnd : args.timeEnd || null,
            size    : args.size || 100
        };

        _self.logs = [];

        ejs.query(_args).then(function(data) {
            var _logs;

            _self.total = data.hits.total;

            _logs = data.hits.hits || [];
            _logs.forEach(function(log){
                log.fields && _self.logs.push(log.fields);
            });

            defer.resolve(_self);
        });
        return defer.promise;

    }

    Logs.prototype.new = function(log){
        this.logs.push(log);
        this.total++;

        var defer = $q.defer();
        defer.resolve(this);
        return defer.promise;
    }


    return new Logs();
});
