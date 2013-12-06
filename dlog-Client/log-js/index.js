;(function($) {

    var dlog = function dlog (options) {
        this.host    = 'http://127.0.0.1:9610';
        this.logApi  = '/message';
        this.service = 'meepshop-facade';
    };

    dlog.prototype.send = function send() {

        var _url   = this.host + this.logApi;
        var _msg   = {
            service : this.service,
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

    dlog.prototype.log = function () {
        this._log('INFO', arguments);
    };

    dlog.prototype.info = function () {
        this._log('INFO', arguments);
    };

    dlog.prototype.debug = function () {
        this._log('DEBUG', arguments);
    };

    dlog.prototype.error = function () {
        this._log('ERROR', arguments);
    };

    dlog.prototype.warning = function () {
        this._log('WARNING', arguments);
    };

    dlog.prototype._log = function (level, args) {
        Array.prototype.unshift.call(args, level);
        this.send.apply(this, args);
    };




    window.dlog = new dlog();

    dlog.log('DEBUG', 'HIHI');

})(jQuery);
