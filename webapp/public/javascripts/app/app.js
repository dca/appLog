/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('ml', [
    'ngResource',
    'elasticjs.service',
    'btford.socket-io'
]).

config(function(
    socketProvider
){
    var mySocket = io.connect('http://localhost:9603');
      // do stuff with mySocket
    socketProvider.ioSocket(mySocket);
});
