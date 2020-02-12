const http = require('http');
const httpProxy = require('http-proxy');
const modifyResponse = require('http-proxy-response-rewrite');
const {commitCommand, pushCommand, branchCommand, addScripts, addStyles, allBranches, checkoutCommand} = require('./git-helper');
const fs = require('fs');


var proxy = httpProxy.createProxyServer({
    target: 'http://localhost:8080/'
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    modifyResponse(res, proxyRes.headers['content-encoding'], function (body) {
            if (req.url === "/swagger-editor/") {
                body = body.slice(0, body.indexOf('<head>') + 6) + addScripts() + addStyles() + body.slice(body.indexOf('<head>') + 6, body.length);
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
            res.end();
            break;
        case "/push":
            pushCommand().then(() => {
                res.statusCode = 200;
                res.end();
            }).catch((reason => {
                res.write(reason);
                res.statusCode = 500;
                res.end();
            }));
            break;
        case "/checkout":
            req.on('data', function (msg) {
                const formData = JSON.parse(msg);
                checkoutCommand(formData['branch-name']).then(() => {
                    res.statusCode = 200;
                    res.end();
                }).catch((reason => {
                    res.write(reason);
                    res.statusCode = 500;
                    res.end();
                }));
            });
            break;
        case "/branch":
            req.on('data', function (msg) {
                const formData = JSON.parse(msg);
                branchCommand(formData['branch-from'], formData['branch-name'])
            });
            res.statusCode = 200;
            res.end();
            break;
        case "/allBranches":
            allBranches().then((br) => {
                res.write(JSON.stringify(br));
                res.statusCode = 200;
                res.end();
            }).catch((reason => {
                res.write(reason);
                res.statusCode = 500;
                res.end();
            }));
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
            break;
    }
    console.log(req.url);
}).listen(5000);
