var express = require('express');
var app = express();

var dLog = require('../');

dLog = new dLog.Client({
    service : 'meepshop-system',
    port: 9602
});


app.configure(function() {
    app.use(dLog.middleware());
    app.use(app.router);

});

var level = ['ERROR', 'WARNING', 'INFO', 'DEBUG'];
var KeyIndex = function(){
    return Math.round(Math.random()*100 % 3);
}


app.get('*', function (req, res) {
    var _level = level[ KeyIndex() ];

    dLog.send( _level,  _level + ' !! Hello!!');
    res.send('Hello World!!');
});


app.listen(3000);
console.log('Listening on port 3000');
