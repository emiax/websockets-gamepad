(function (exports) {
    exports.httpPort = 1337;
    exports.wsPort = 8000;
    exports.reportHost = '127.0.0.1';
    exports.reportPort = 1338;
})(typeof exports === 'undefined' ? this['config']={} : exports);
