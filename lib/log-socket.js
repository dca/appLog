
var io = require('socket.io').listen(9603);

io.sockets.on('connection', function (socket) {
    // console.log('sockets.on connection', socket._id);
});


function log2Socket () {
    this.pluginName = 'log-Socket';
}

log2Socket.prototype.write = function (data) {
    // var args = [];
    // console.log('try emin to io');

    io.sockets.emit('log', data);
};


var output = new log2Socket();

exports = module.exports = output;
