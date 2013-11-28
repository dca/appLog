var axon = require('axon')
  , sock = axon.socket('pub-emitter');

sock.connect(9602, '0.0.0.0');

setInterval(function(){
    sock.emit('WARNING', {
        service : 'meepshop-store',
        message : 'order create failed',
        stackStr : (new Error()).stack
    });
}, 1000);
