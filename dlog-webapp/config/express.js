var express = require('express');
var path = require('path');

module.exports = function(app, config) {

    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());

    }

    // all environments
    app.set('port', process.env.PORT || 9606);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(app.router);
    app.use(express.static(path.join(__dirname, '../public')));



};
