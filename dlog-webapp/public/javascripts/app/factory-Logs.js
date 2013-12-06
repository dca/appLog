'use strict';

angular.module('dlog').

factory('Logs', function(
    ejs,
    $q
){
    var service = {};

    function Logs () {
        this.logs = [];

        this.filter = {};
        this.query  = {};

        this.total = 0;

        this.service = service;

        _getService();
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

            _self.total = data.hits.total || 0;

            _logs = data.hits.hits || [];
            _logs.forEach(function(log){
                log.fields && _self.logs.push(log.fields);
            });

            defer.resolve(_self);
        });
        return defer.promise;

    }

    function _getService(){
        // var defer = $q.defer();
        ejs.groupby('service').then(function(res) {
            var _service = [];

            try{
                _service = res.facets.service.terms;
            }catch(e){
                //
            }

            angular.forEach(_service, function(el){
                service[el.term] = true;
            });

            console.log(service);
        });
    }

    Logs.prototype.getService = function(scope){
        return service;
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
