#!/usr/bin/env node
var name = process.argv[2];

var p0 = 7500;
var p1 = 7501;

var proxy = require('./' + name)(p1);
proxy.listen(p0);

var http = require('http');
var server = http.createServer(function (req, res) {
    res.end('beepity boop');
});
server.listen(p1);

console.log('ab -n 5000 -c 10 http://localhost:' + p0 + '/');

setInterval(function () {
    var mb = process.memoryUsage().heapTotal / 1024 / 1024;
    var s = String(Math.round(mb * 10) / 10);
    var pad = Array(Math.max(1, 6 - s.length + 1)).join(' ');
    console.log(pad + s + ' M');
}, 2000);
