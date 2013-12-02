var axon = require('axon'),
    Stream = require('stream');


var express = require('express');


var httpListen = module.exports = function httpListen() {
    this.pluginName = 'httpListen';
    return this;
};

httpListen.prototype.createServer = function(logger) {
    var app = express();

    app.use(express.bodyParser());

    app.post('/message', function(req, res){
        if (req.body) {
            var message = req.body;
            var level   = req.body.level;
            delete message.level;

            logger.log.apply(logger, [level, message]);
        }

        res.send('done');
    });

    app.listen(9610);
    console.log('httpListen Listening on port 9610');
    return this;
};


