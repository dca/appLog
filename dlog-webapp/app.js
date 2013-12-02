
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

var app = express();

require('./config/express')(app);
require('./routes')(app);




http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// exports = module.exports = app;

