const git = require('simple-git');
const gitPromises = require('simple-git/promise');


exports.commitCommand = function (msg) {
    const response = git().commit(msg, 'test.txt');
};


exports.pushCommand = function () {
    console.log("PUSH");
};

exports.branchCommand = function () {
    console.log(("BRANCH"))
};

exports.addScripts = function () {
    return `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
            <script src="./test.js"></script>`
};

function getPopUp() {
    return `
    <div id="popup-commit">
        <!-- Contact Us Form -->
        <form id="form-commit" method="post" name="form">
            <img id="close" src="images/3.png" onclick="hideDiv()">
            <h2>Contact Us</h2>
            <hr>
            <input required id="commit-msg-input" name="commit-msg" placeholder="BranchName" type="text"/>
            <button onclick="sendCommitForm()" class="submit-btn">Send</button>
            <button onclick="hideDiv()" class="cancel-btn">Cancel</button>
        </form>
    </div>
`
}

exports.addStyles = function () {
    return `<link rel="stylesheet" type="text/css" href="./test.css">`
};