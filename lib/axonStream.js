var axon = require('axon'),
    Stream = require('stream');

var AxonStream = module.exports = function AxonStream(port) {
    var socket = axon.socket('push');
    socket.bind(port);
    this.createStream(socket);
};

AxonStream.prototype.createStream = function(socket) {
    var stream = new Stream();
    stream.writable = true;

    stream.write = function(buf) {
        socket.send(buf);
    };

    stream.end = function(buf) {
        if (arguments.length) {
            stream.write(buf);
        }
        stream.writable = false;
    };

    stream.destroy = function() {
        stream.writable = false;
    };

    return stream;
};