(function (exports) { 
    exports.httpPort = 1337;
    exports.wsPort = 8000;
    exports.hostName = "127.0.0.1";
})(typeof exports === 'undefined' ? this['config']={} : exports);
