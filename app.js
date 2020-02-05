const http = require('http');
const httpProxy = require('http-proxy');
const modifyResponse = require('http-proxy-response-rewrite');
const {commitCommand, pushCommand, branchCommand, addScripts, addStyles} = require('./git');
const fs = require('fs');



var proxy = httpProxy.createProxyServer({
    target: 'http://localhost:8080/'
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    modifyResponse(res, proxyRes.headers['content-encoding'], function (body) {
            if (req.url === "/swagger-editor/") {
                body = body.slice(0, body.indexOf('<head>') + 6) + addScripts() + body.slice(body.indexOf('<head>') + 6, body.length);
                body = body.slice(0, body.lastIndexOf('<head>') + 6) + addStyles() + body.slice(body.lastIndexOf('<head>') + 6, body.length);
                // console.log(body);
            }
            return body;
        }
    );
});


var server = http.createServer(function (req, res) {
    switch (req.url) {
        case "/commit":
            req.on('data', function (msg) {
                const formData = JSON.parse(msg);
                commitCommand(formData['commit-msg']);
            });
            res.statusCode = 200;
            res.end("200");
            break;
        case "/push":
            res.write(JSON.stringify({name: 'PUSH ZHOPA', age: 1, version: '0000'}));
            res.end();
            break;
        case "/branch":
            req.on('data', function (msg) {
                const formData = JSON.parse(msg);
                console.log(formData);
                branchCommand(formData['branch-name']);
            });
            res.statusCode = 200;
            res.end("200");
            break;
        case "/swagger-editor/test.js":
            res.write(fs.readFileSync("./test.js"));
            res.end();
            break;
        case "/swagger-editor/test.css":
            res.write(fs.readFileSync("./test.css"));
            res.end();
            break;
        default:
            proxy.web(req, res);
    }
    console.log(req.url);
}).listen(5000);
