var axonStream = require('./axonStream');
var middleware = require('./middleware-express');



var Client = function Client(options) {

    options = options || {};

    /**
     * Config
     */
    // this.port = options.port;
    // this.host = options.host || '0.0.0.0';
    this.serviceName = options.service || 'Unknown';
    this.hosts = options.hosts || [];

    /**
     * Instance
     */
    this.axonStream = null;
    this.middleware = middleware;

    /**
     * Connect
     */
    this.connect(this.hosts);
};





/**
 * Connect to a axon socket
 *
 * @param {Number} port
 * @param {String} host
 * @api private
 */

Client.prototype.connect = function (hosts) {
    this.axonStream = new axonStream(hosts);
}

/**
 * Send a message
 *
 * @param {String} EventName
 * @param {Object} message
 * @api public
 */

Client.prototype.send = function (event, message) {
    var msg = {
        service: this.serviceName,
        message: message,
        stackStr: (new Error()).stack
    };

    this.axonStream.send(event, msg);
}


Client.prototype.log = function log(message) {
    this.send('DEBUG', message );
}



/**
 *
 * Exports
 *
 */
module.exports.middleware = middleware;
module.exports.Client = Client;
