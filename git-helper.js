const git = require('simple-git');
const gitP = require('simple-git/promise');

exports.commitCommand = function (msg) {
    return git().commit(msg, 'test.txt');
};

exports.pushCommand = function () {
    return gitP().push('https://github.com/mobilemoneyapi/specification.git')
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
    gitP().checkout(checkoutFrom).then(git().checkout(branchName));
};

exports.addScripts = function () {
    return `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="./test.js"></script>`
};

exports.addStyles = function () {
    return `<link rel="stylesheet" type="text/css" href="./test.css">`
};