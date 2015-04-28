var elasticsearch = require('es');

var config = {
    server : {
        host : 'localhost',
        port : 9200
    },
    _index : 'logger'
};

var options = {
    _index : 'dca',
    _type : 'logger_test'
};

es = elasticsearch(config);


//
//
//
//
//

function log2ES () {
    this.es = es;
    this.pluginName = 'log2ES';
}


log2ES.prototype.write = function (obj) {
    var documents = [obj];

    es.bulkIndex(options, documents, function (err, data) {
        if (err) {
            console.log(err);
        }
    });
};


var log2ES = new log2ES();

exports = module.exports = log2ES;
