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




// function parseRequest(req, kwargs) {
//     kwargs = kwargs || {};

//     // create absolute url
//     var host = req.headers.host || '<no host>';
//     var full_url = (req.socket.encrypted ? 'https' : 'http') + '://' + host + req.url;

//     var http = {
//         method: req.method,
//         userAgent : req.headers['user-agent'],
//         query_string: req.query,
//         data: req.body || '<unavailable>',
//         url: full_url,
//     };

//     var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] ||
//              req.connection.remoteAddress;
//     http.REMOTE_ADDR = ip;
//     kwargs['dlog'] = http;
//     return kwargs;
// };
