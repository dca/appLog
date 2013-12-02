var expect = require('chai').expect;
var should = require('chai').should();

var Log     = require(__dirname + '/../');
var logger  = new Log();

var axon = require('axon'),
    socket = axon.socket('sub-emitter');



socket.bind(9600, '0.0.0.0');

logger.on('message', function(message) {
    logger.log('INFO', message);
})





for (i = 0; i < 10; i++)
    logger.emit('message', 'Hello');








// describe('logger init', function() {
//     it('should be object', function() {
//         logger.should.be.a('object');
//     });
// });
