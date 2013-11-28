var axonStream = require('./axonStream');
var middleware = require('./middleware-express');

module.exports.middleware = middleware;


var Client = function Client(options) {
    options = options || {};

    this.port = options.port;
    this.host = options.host || '0.0.0.0';
    this.serviceName = options.service || 'Unknown'

    this.axonStream = null;
    this.middleware = middleware;

    this.connect(this.port, this.host);
};

module.exports.Client = Client;





/**
 * Connect to a axon socket
 *
 * @param {Number} port
 * @param {String} host
 * @api private
 */

Client.prototype.connect = function (port, host) {
    this.axonStream = new axonStream(port, host);
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

    this.axonStream.emit(event, msg);
}
