var http = require('http');
var httpProxy = require('http-proxy');
var modifyResponse = require('http-proxy-response-rewrite');
const {commitCommand, pushCommand, branchCommand, addScripts, addStyles} = require('./git');


// Create a proxy server
var proxy = httpProxy.createProxyServer({
    target: 'http://localhost:8080/'
});

// Listen for the `proxyRes` event on `proxy`.
proxy.on('proxyRes', function (proxyRes, req, res) {
    modifyResponse(res, proxyRes.headers['content-encoding'], function (body) {
            let str = "<div id=\"swagger-editor\"></div>";
            let index = body.indexOf();
            let b = "<button onclick=\"showDiv()\">NEW Test</button>";
            let sc = addScripts() + addStyles() + `

<div id="page-container">
    <div class="specific-button-container">
        <button class="specific-button" onclick="showDiv()">New Branch</button>
        <button class="specific-button">Commit</button>
        <button class="specific-button">Push</button>
    </div>
    <div id="swagger-editor">infa</div>
</div>
<div id="abc">
    <div id="popupContact">
        <!-- Contact Us Form -->
        <form action="#" id="form-new-branch" method="post" name="form">
            <img id="close" src="images/3.png" onclick="hideDiv()">
            <h2>Contact Us</h2>
            <hr>
            <input id="name" name="name" placeholder="BranchName" type="text"/>
            <a href="javascript:%20checkEmpty()" class="submit-btn">Send</a>
            <a href="javascript:%20hideDiv()" class="cancel-btn">Cancel</a>
        </form>
    </div>
</div>`;
            let u = body.slice(0, index) + sc + body.slice(index, body.size);
            console.log(u);
        return u;}
    );
});

var server = http.createServer(function (req, res) {
    switch (req.url) {
        case "/commit":
            commitCommand();
            res.write("<button onclick=\"commitCommand()\">NEW Test</button>");
            break;
        case "/push":
            res.write(JSON.stringify({name: 'PUSH ZHOPA', age: 1, version: '0000'}));
            res.end();
            break;
        case "/branch":
            res.write(JSON.stringify({name: 'BRANCH ZHOPA', age: 1, version: '0000'}));
            res.end();
            break;
        default:
            proxy.web(req, res);
    }
    console.log(req.url);
}).listen(5000);