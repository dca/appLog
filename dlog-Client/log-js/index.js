;(function($) {

    var dlog = function dlog (options) {
        this.host    = 'http://127.0.0.1:9610';
        this.logApi  = '/message';
        this.service = 'AdminFront';
    };

    dlog.prototype.log = function () {
        this.send.apply(this, arguments);
    };

    dlog.prototype._log = function () {
        this.send.apply(this, arguments);
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
            data : {
                msg   : _msg
            },
            success: function () {}
        });
    };




    window.dlog = new dlog();

    dlog.log('DEBUG', 'HIHI');

})(jQuery);
