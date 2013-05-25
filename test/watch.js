var WatchLog = require(__dirname+'/../lib/WatchLog');
watchLog = new WatchLog();
watchLog.watch(__dirname+'/log.json');
