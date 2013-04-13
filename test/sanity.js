var Log = require(__dirname + '/../');

var chai = require("chai"),
    expect = chai.expect;

var Stream = require('stream'),
    stream = new Stream;

var log = new Log('info', stream)

describe('Logger instance sanity check', function() {
    describe('log instance has a function log', function() {
        it('should return function when typeof is called on the Log', function() {
            expect(Log).to.be.a('function');
        })
    })
    describe('log instance has the correct level mapping', function() {
        it('should return the correct number for each level', function() {
            expect(Log.EMERGENCY).to.equal(0);
            expect(Log.ALERT).to.equal(1);
            expect(Log.CRITICAL).to.equal(2);
            expect(Log.ERROR).to.equal(3);
            expect(Log.WARNING).to.equal(4);
            expect(Log.NOTICE).to.equal(5);
            expect(Log.INFO).to.equal(6);
            expect(Log.DEBUG).to.equal(7);
        })
    })

})