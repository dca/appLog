var axon = require('axon');

var AxonStream = module.exports = function AxonStream(port, address) {
    var socket = axon.socket('pub-emitter');

    socket.connect(port, address);
    return socket;
};
