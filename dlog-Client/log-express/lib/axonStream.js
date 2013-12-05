var axon = require('axon');

var AxonStream = module.exports = function AxonStream(servers) {
    var socket = axon.socket('push');

    socket.format('json');

    servers.forEach(function(host) {
        socket.connect(host);
    });

    return socket;
};
