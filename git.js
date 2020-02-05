const git = require('simple-git');

exports.commitCommand = function (msg) {
    return git().commit(msg, 'test.txt');
};

exports.pushCommand = function () {
    console.log("PUSH");
};

exports.branchCommand = function (branchName) {
    git().checkoutLocalBranch(branchName);
};

exports.addScripts = function () {
    return `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="./test.js"></script>`
};

exports.addStyles = function () {
    return `<link rel="stylesheet" type="text/css" href="./test.css">`
};