var dLog = require('./client');

module.exports = function middleware() {

    /**
     *
     * return middleware
     *
     */
    return function(req, res, next) {
        next();
    };
};
