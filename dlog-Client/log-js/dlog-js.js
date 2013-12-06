;(function($) {

    var host    = 'http://127.0.0.1:9610';
    var logApi  = '/message';
    var Service = 'Unknown';

    var dlog = function dlog (options) {
        return this;
    };

    function _log(level, args) {
        Array.prototype.unshift.call(args, level);
        send.apply(this, args);
    };

    function send() {

        var _url   = host + logApi;
        var _msg   = {
            service : Service,
            message : arguments,
            stackStr: (new Error()).stack
        };

        $.ajax({
            url  : _url,
            type : 'POST',
            dataType: 'jsonp',
            data : { msg : _msg },
            success: function () {}
        });
    };

    dlog.prototype.service = function (name) {
        if (typeof name === 'string') {
            Service = name;
        }
        return this;
    };

    dlog.prototype.log = function () {
        _log('INFO', arguments);
    };

    dlog.prototype.info = function () {
        _log('INFO', arguments);
    };

    dlog.prototype.debug = function () {
        _log('DEBUG', arguments);
    };

    dlog.prototype.error = function () {
        _log('ERROR', arguments);
    };

    dlog.prototype.warning = function () {
        _log('WARNING', arguments);
    };





    window.dlog = new dlog();

})(jQuery);
