var express = require('express');
var app = express();

var dLog = require('../');

dLog = new dLog.Client({
    service : 'dlog-express',
    port: 9602
});


app.configure(function() {
    app.use( dLog.middleware(dLog) );
});


app.get('*', function (req, res) {
    dLog.send('INFO', 'Hello World!!');
    res.send('Hello World!!');
});


app.listen(3000);
console.log('Listening on port 3000');
