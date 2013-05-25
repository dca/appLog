var cluster = require('cluster'),
    Stream = require('stream'),
    Log = require(__dirname + '/../'),
    axon = require('axon'),
    port = 12345;


if (cluster.isMaster) {
    for (var i = 0; i < 2; i++) cluster.fork();

    cluster.on('death', function(worker) {
        console.log('worker ' + worker.pid + ' died');
    });

    //push = upstream

    var log = new Log('info', stream);
    var stream = log.createStream(12345);

    setInterval(function() {
        log.info('hello');
    }, 1000)


} else {
    //pull = downstream

    var socket = axon.socket('pull');

    socket.identity = 'downstream' + process.pid;
    socket.connect(port);

    socket.on('message', function(data) {
        console.log(socket.identity + ': received data ' + data.toString());
    });
}

