var fs = require('fs'),
    Tail = require('tail').Tail;


var WatchLog = module.exports = function WatchLog(options) {};


WatchLog.prototype.watch = function(file) {

    var tail = new Tail(file);

    tail.on('line', function(data) {
        console.log(data);
    });

};