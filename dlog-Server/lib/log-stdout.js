var inherits = require('inherits');

/**
 * Initialize a `Loggeer` with the given log `level` defaulting
 * to __DEBUG__ and `stream` defaulting to _stdout_.
 *
 * @param {Number} level
 * @param {Object} stream
 * @api public
 */

// var stdout = module.exports = function stdout() {
//     this.name = 'stdout';
// };


function Output () {
    this.pluginName = 'stdout';
}


Output.prototype.write = function () {
    var args = [];

    Array.prototype.forEach.call(arguments, function(el){
        args.push( JSON.stringify(el) );
    });
    process.stdout.write.apply(process.stdout, args );
    process.stdout.write('\n');
};


var output = new Output();

exports = module.exports = output;
