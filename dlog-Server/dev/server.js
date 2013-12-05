

/**
 * Init a logger
 *
 *
 */
var Log     = require(__dirname + '/../');
var logger  = new Log();





/**
 * Socket listener
 *
 * @type Event
 */
var axon = require('axon'),
    axonSocket = axon.socket('pull');


axonSocket.format('json');

/**
 * Bind axon listener on port
 */
axonSocket.bind(9602, '0.0.0.0');


/**
 * log on message in
 */
axonSocket.on('message', function() {
    console.log('----------axonSocket----------');
    logger.log.apply(logger, arguments);
});




/**
 * Http listener
 *
 *
 */

var httpListen = require('../lib/listen-http');

httpListen = new httpListen();
httpListen.createServer(logger);
