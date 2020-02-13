const git = require('simple-git');
const gitP = require('simple-git/promise');

exports.commitCommand = function (msg) {
    return git().commit(msg, 'test.txt');
};

exports.pushCommand = function (remoteName) {
    return gitP().raw(['push', remoteName])
};

exports.getRemotes = function () {
    return gitP().getRemotes(false)
};

exports.addRemote = function (remoteName, username, password) {
    console.log(`https://${username}:${password}@github.com/paveI-fando/node-js-proxy.git`);
    return gitP().addRemote(remoteName, `https://${username}:${password}@github.com/paveI-fando/node-js-proxy.git`)
};

exports.deleteRemote = function (remoteName) {
    git().removeRemote(remoteName);
};

exports.checkoutCommand = function (branchName) {
    return gitP().checkout(branchName)
};

exports.allBranches = function () {
    // return gitP().branch([]);
    gitP().branch([]).then((br) => console.log(br));
    return gitP().branch([]);

};

exports.branchCommand = function (checkoutFrom, branchName) {
    gitP().checkout(checkoutFrom).then(gitP().checkout(branchName));
};

exports.addScripts = function () {
    return `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="./test.js"></script>`
};

exports.addStyles = function () {
    return `<link rel="stylesheet" type="text/css" href="./test.css">`
};