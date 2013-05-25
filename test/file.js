var Log = require(__dirname + '/../'),
    fs = require('fs'),
    Faker = require('Faker');


fs.unlink(__dirname + '/log.json', function(err) {
    var writeStream = fs.createWriteStream(__dirname + '/log.json');
    var log = new Log('info', writeStream);

    for (i = 0; i < 10; i++)
        log.info([1,2, i]);
    
});

