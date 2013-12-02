var elasticsearch = require('elasticsearch');

var config = {
    server : {
        host : 'localhost',
        port : 9200
    },
    _index : 'dca'
};

var options = {
    _index : 'dca',
    _type : 'logger_test'
}

es = elasticsearch(config);



var documents = [
  { name : 'hamish', breed : 'manx', color : 'tortoise' },
  { name : 'dugald', breed : 'siamese', color : 'white' },
  { name : 'keelin', breed : 'domestic long-hair', color : 'russian blue' }
];


es.bulkIndex(options, documents, function (err, data) {
  // teh datas
    console.log(err,data);
});
