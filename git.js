exports.commitCommand = function () {
    console.log("commit");
};

exports.pushCommand = function () {
    console.log("PUSH");
};

exports.branchCommand = function () {
    console.log(("BRANCH"))
};

exports.addScripts = function () {
    return `<script> 
function checkEmpty() {
    if (document.getElementById('name').value === "" || document.getElementById('email').value === "" || document.getElementById('msg').value === "") {
        alert("Fill All Fields !");
    } else {
        document.getElementById('form').submit();
        alert("Form Submitted Successfully...");
    }
}

function showDiv() {
    document.getElementById('abc').style.display = "block";
}

function hideDiv(){
    document.getElementById('abc').style.display = "none";
}
</script>`
};

exports.addStyles = function () {
    return `
<style>
        .specific-button-container {
            width: 50%;
            padding: 10px;
            background: #2d2d2d;
            box-sizing: border-box;
            border-bottom: 3px solid #aaa;
        }

        .specific-button {
            box-shadow:inset 0 34px 0 -15px #b54b3a;
            background-color:#a73f2d;
            border-radius:9px;
            border:1px solid #241d13;
            display:inline-block;
            cursor:pointer;
            color:#ffffff;
            font-family:sans-serif;
            font-size:15px;
            font-weight:bold;
            padding:11px;
            text-decoration:none;
            text-shadow:0 -1px 0 #7a2a1d;
            width: auto;
        }
        .specific-button:hover {
            background-color:#b34332;
        }
        .specific-button:active {
            position:relative;
            top:1px;
        }
        #abc {
            width:100%;
            height:100%;
            top:0;
            left:0;
            display:none;
            position:absolute;
            overflow:auto;
            z-index: 6;
        }
        img#close {
            position:absolute;
            right:-14px;
            top:-14px;
            cursor:pointer
        }
        div#popupContact {
            position:absolute;
            left:50%;
            top:17%;
            margin-left:-202px;
            font-family:'Raleway',sans-serif
        }
        form {
            max-width:300px;
            min-width:250px;
            padding:10px 50px;
            border:2px solid gray;
            border-radius:10px;
            font-family:sans-serif;
            background-color:#fff
        }
        p {
            margin-top:30px
        }
        h2 {
            background-color:#FEFFED;
            padding:20px 35px;
            margin:-10px -50px;
            text-align:center;
            border-radius:10px 10px 0 0
        }
        hr {
            margin:10px -50px;
            border:0;
            border-top:1px solid #ccc
        }
        input[type=text] {
            width:82%;
            padding:10px;
            margin-top:30px;
            border:1px solid #ccc;
            padding-left:40px;
            font-size:16px;
            font-family:sans-serif;
        }
        #name {
            background-image:url(../images/name.jpg);
            background-repeat:no-repeat;
            background-position:5px 7px
        }
        #email {
            background-image:url(../images/email.png);
            background-repeat:no-repeat;
            background-position:5px 7px
        }
        textarea {
            background-image:url(../images/msg.png);
            background-repeat:no-repeat;
            background-position:5px 7px;
            width:82%;
            height:95px;
            padding:10px;
            resize:none;
            margin-top:30px;
            border:1px solid #ccc;
            padding-left:40px;
            font-size:16px;
            font-family:sans-serif;
            margin-bottom:30px
        }
        .submit-btn {
            text-decoration:none;
            width:100%;
            text-align:center;
            display:block;
            background-color:#FFBC00;
            color:#fff;
            border:1px solid #FFCB00;
            padding:10px 0;
            font-size:20px;
            cursor:pointer;
            border-radius:5px
        }
        .cancel-btn {
             text-decoration:none;
             width:100%;
             text-align:center;
             display:block;
             background-color: #757575;
             color:#fff;
             border:1px solid #757575;
             padding:10px 0;
             font-size:20px;
             cursor:pointer;
             border-radius:5px
         }
        button {
            width:10%;
            height:45px;
            border-radius:3px;
            background-color:#cd853f;
            color:#fff;
            font-family:'Raleway',sans-serif;
            font-size:18px;
            cursor:pointer
        }
</style>`
};