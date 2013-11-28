var dLog = require('./client');

module.exports = function middleware(client) {
    client = (client instanceof dLog.Client) ? client : new dLog(client);


    /**
     *
     * return middleware
     *
     */
    return function(err, req, res, next) {
        next(err, req, res);
    };
};
