var EventEmitter = require('events').EventEmitter,
    Stream = require('stream'),
    AxonStream = require('./axonStream'),
    WatchLog = require('./watchLog'),
    inherits = require('inherits');

/**
 * Initialize a `Loggeer` with the given log `level` defaulting
 * to __DEBUG__ and `stream` defaulting to _stdout_.
 *
 * @param {Number} level
 * @param {Object} stream
 * @api public
 */

var Log = module.exports = function Log(level, stream) {
    if ('string' === typeof level) {
        level = exports[level.toUpperCase()];
    }
    this.level = level || exports.DEBUG;
    this.stream = stream || process.stdout;
};



/**
 * Inherit from `EventEmitter`.
 */
inherits(Log, EventEmitter);


/**
 * System is unusable.
 *
 * @type Number
 */

exports.EMERGENCY = 0;

/**
 * Action must be taken immediately.
 *
 * @type Number
 */

exports.ALERT = 1;

/**
 * Critical condition.
 *
 * @type Number
 */

exports.CRITICAL = 2;

/**
 * Error condition.
 *
 * @type Number
 */

exports.ERROR = 3;

/**
 * Warning condition.
 *
 * @type Number
 */

exports.WARNING = 4;

/**
 * Normal but significant condition.
 *
 * @type Number
 */

exports.NOTICE = 5;

/**
 * Purely informational message.
 *
 * @type Number
 */

exports.INFO = 6;

/**
 * Application debug messages.
 *
 * @type Number
 */

exports.DEBUG = 7;

/**
 * prototype.
 */

/**
 * Log output message.
 *
 * @param  {String} levelStr
 * @param  {Array} args
 * @api private
 */

Log.prototype.log = function(levelStr, args) {
    if (exports[levelStr] <= this.level) {
        var obj = {};
        obj.level = levelStr;
        obj.msg = args[0] || '';
        obj.time = new Date();
        this.stream.write(JSON.stringify(obj));
        this.stream.write('\n');

    }
};

/**
 * Log emergency `msg`.
 *
 * @param  {String} msg
 * @api public
 */

Log.prototype.emergency = function(msg) {
    this.log('EMERGENCY', arguments);
};

/**
 * Log alert `msg`.
 *
 * @param  {String} msg
 * @api public
 */

Log.prototype.alert = function(msg) {
    this.log('ALERT', arguments);
};

/**
 * Log critical `msg`.
 *
 * @param  {String} msg
 * @api public
 */

Log.prototype.critical = function(msg) {
    this.log('CRITICAL', arguments);
};

/**
 * Log error `msg`.
 *
 * @param  {String} msg
 * @api public
 */

Log.prototype.error = function(msg) {
    this.log('ERROR', arguments);
};

/**
 * Log warning `msg`.
 *
 * @param  {String} msg
 * @api public
 */

Log.prototype.warning = function(msg) {
    this.log('WARNING', arguments);
};

/**
 * Log notice `msg`.
 *
 * @param  {String} msg
 * @api public
 */

Log.prototype.notice = function(msg) {
    this.log('NOTICE', arguments);
};

/**
 * Log info `msg`.
 *
 * @param  {String} msg
 * @api public
 */

Log.prototype.info = function(msg) {
    this.log('INFO', arguments);
};

/**
 * Log debug `msg`.
 *
 * @param  {String} msg
 * @api public
 */
Log.prototype.debug = function(msg) {
    this.log('DEBUG', arguments);
};

Log.prototype.createStream = function(port) {
    return new AxonStream(port);
};

Log.prototype.watch = function(file) {
    var watch =  new WatchLog();
    return watch.watch(file);
};

