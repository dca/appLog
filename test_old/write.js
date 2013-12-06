var Log = require(__dirname + '/../');

var chai = require('chai'),
    expect = chai.expect;

var Stream = require('stream');

var text;

var stream = (function() {
    var stream = new Stream();
    stream.writable = true;

    stream.write = function(buf) {
        text = buf ;
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

})();

var log = new Log('info', stream);

describe('when writing to a writable stream', function() {
    it('the stream should contain the logged text', function() {
        log.info('test', stream);
        expect(text).to.be.a('string');
    });
});

describe('after writing, the stream', function() {
    it('should be parsable', function() {
        expect(JSON.parse(text)).to.be.an('object');
    });
    it('should contain a log level', function() {
        expect(JSON.parse(text).level).to.equal('INFO');
    });
    it('should contain a time string', function() {
        expect(JSON.parse(text).time).to.be.a('string');
    });
    it('should contain a message', function() {
        expect(JSON.parse(text).msg).to.be.a('string');
    });
});