var axon = require('axon'),
    Stream = require('stream');


var express = require('express');


var httpListen = module.exports = function httpListen() {
    this.pluginName = 'httpListen';
    this.logger     = null;
    return this;
};

httpListen.prototype.createServer = function(logger) {
    var app;
    var _self = this;

    _self.logger = logger;

    app = express();
    app.use(express.bodyParser());

    app.get('/message', function(req, res){
        if (req.query) {
            _self.send(req.query.msg);
        }
        res.jsonp({status: 'done'});
    });

    app.listen(9610);
    console.log('httpListen Listening on port 9610');
    return this;
};


httpListen.prototype.send = function(msg) {
    //
    var level = 'INFO';
    var logger = this.logger;

    if ( levelmap.indexOf( msg.message[0] ) >-1 ){
        level = msg.message.shift();
    }
    if (msg.message.length === 1) {
        msg.message = msg.message.shift();
    }

    // console.log(msg);
    logger.log.apply(logger, [level, msg] );
};

var levelmap=['ERROR','INFO','WARNING', 'DEBUG'];
