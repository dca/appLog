/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('dlog', [
    'ngResource',
    'elasticjs.service',
    'btford.socket-io',
    'ui.bootstrap'
]).

config(function(
    socketProvider
){
    var mySocket = io.connect('http://localhost:9603');
      // do stuff with mySocket
    socketProvider.ioSocket(mySocket);
});
