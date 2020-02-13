const http = require('http');
const httpProxy = require('http-proxy');
const modifyResponse = require('http-proxy-response-rewrite');
const {commitCommand, pushCommand, branchCommand, addScripts, addStyles, allBranches, checkoutCommand, getRemotes, addRemote, deleteRemote} = require('./git-helper');
const fs = require('fs');
const REMOTE_URL_VAR = 'swagger_editor_remote';


const proxy = httpProxy.createProxyServer({
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

const server = http.createServer(function (req, res) {
    switch (req.url) {
        case "/commit":
            req.on('data', function (msg) {
                const formData = JSON.parse(msg);
                commitCommand(formData['commit-msg']);
            });
            res.writeHead(200);
            res.end();
            break;
        case "/push":
            pushCommand(REMOTE_URL_VAR).then(() => {
                res.writeHead(200);
                res.end();
            }).catch((reason => {
                deleteRemote(REMOTE_URL_VAR);
                res.writeHead(500);
                res.write(reason.toString());
                res.end();
            }));
            break;
        case "/remotes":
            getRemotes().then((rm) => {
                res.writeHead(200);
                res.write(checkRemotes(rm));
                res.end()
            }).catch((reason => {
                res.writeHead(500);
                res.write(reason.toString());
                res.end();
            }));
            break;
        case "/checkout":
            req.on('data', function (msg) {
                const formData = JSON.parse(msg);
                checkoutCommand(formData['branch-name']).then(() => {
                    res.writeHead(200);
                    res.end();
                }).catch((reason => {
                    res.writeHead(500);
                    res.write(reason.toString());
                    res.end();
                }));
            });

            break;
        case "/branch":
            req.on('data', function (msg) {
                const formData = JSON.parse(msg);
                branchCommand(formData['branch-from'], formData['branch-name']).then((result) => {
                    res.writeHead(200);
                    res.write(result.toString());
                    res.end();
                }).catch((reason) => {
                    res.writeHead(500);
                    res.write(reason.toString());
                    res.end();
                });
            });
            break;
        case "/allBranches":
            allBranches().then((br) => {
                res.writeHead(200);
                res.write(JSON.stringify(br));
                res.end();
            }).catch((reason => {
                res.writeHead(500);
                res.write(reason.toString());
                res.end();
            }));
            break;
        case "/login":
            req.on('data', function (msg) {
                const formData = JSON.parse(msg);
                addRemote(REMOTE_URL_VAR, formData['username'], formData['password']).then(() => {
                    res.writeHead(200);
                    res.end()
                }).catch((reason) => {
                    res.writeHead(500);
                    res.write(reason.toString());
                    res.end()
                })
            });
            break;
        case "/swagger-editor/git-control-elements.js":
            res.write(fs.readFileSync("./git-control-elements.js"));
            res.end();
            break;
        case "/swagger-editor/git-control-elements.css":
            res.write(fs.readFileSync("./git-control-elements.css"));
            res.end();
            break;
        default:
            proxy.web(req, res);
            break;
    }
}).listen(5000);

function checkRemotes(remotes) {
    return JSON.stringify({isRemoteDefined: remotes.filter((rm) => rm.name === REMOTE_URL_VAR).length > 0})
}