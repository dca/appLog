

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
    axonSocket = axon.socket('sub-emitter');





/**
 * Bind axon listener on port
 *
 *
 */
axonSocket.bind(9602, '0.0.0.0');





/**
 * log on message in
 *
 *
 */
axonSocket.on('*', function(event) {
    logger.log.apply(logger, arguments);
});





/**
 * Socket.io
 *
 *
 */

// on lib
