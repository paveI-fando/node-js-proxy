var http = require('http');
var httpProxy = require('http-proxy');
var modifyResponse = require('http-proxy-response-rewrite');

// Create a proxy server
var proxy = httpProxy.createProxyServer({
    target: 'http://localhost:8080/'
});

// Listen for the `proxyRes` event on `proxy`.
proxy.on('proxyRes', function (proxyRes, req, res) {
    modifyResponse(res, proxyRes.headers['content-encoding'], function (body) {
        console.log(body);
        console.log(typeof body);
        const b ="<button>ZHOPA</button>";
        let index = body.indexOf("<div id=\"swagger-editor\"></div>");
        let body1 = body.slice(0, index) + b + body.slice(index);
        console.log(body1);
        return body1;
    });
});

// Create your server and then proxies the request
var server = http.createServer(function (req, res) {
    proxy.web(req, res);
}).listen(5000);
// // Create your target server
// var targetServer = http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     res.write(JSON.stringify({name: 'http-proxy-json', age: 1, version: '1.0.0'}));
//     res.end();
// }).listen(5001);