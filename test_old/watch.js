var Log = require(__dirname+'/..');

var log = new Log('info')

log.watch(__dirname+'/log.json');
