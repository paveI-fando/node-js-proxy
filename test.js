const htmlString = `
<div class="popup-wrapper">
    <div id="popup-branch" class="form-container">
        <form action="/branch" id="form-branch" class="popup-form" method="post" name="form">
            <img id="close" src="images/3.png" onclick="hideDiv()">
            <h2>Contact Us</h2>
            <hr>
            <input required id="commit-msg-input" name="commit-msg" placeholder="Branch name" type="text"/>
            <button type="submit" class="submit-btn">Send</button>
            <button type="reset" onclick="hideDiv()" class="cancel-btn">Cancel</button>
        </form>
    </div>
</div>
<div class="popup-wrapper" id="commit-form-wrapper">
    <div id="popup-commit" class="form-container">
        <form action="/commit" id="form-commit" class="popup-form" method="post" name="form">
            <img id="close" src="images/3.png" onclick="hideDiv()">
            <h2>Contact Us</h2>
            <hr>
            <input required id="commit-msg-input" name="commit-msg" placeholder="Commit message" type="text"/>
            <button type="submit" class="submit-btn">Send</button>
            <button onclick="hideDiv()" class="cancel-btn">Cancel</button>
        </form>
    </div>
</div>
<div class="popup-wrapper">
    <div id="popup-push" class="form-container">
        <form action="/push" id="form-push" class="popup-form" method="post" name="form">
            <img id="close" src="images/3.png" onclick="hideDiv()">
            <h2>Contact Us</h2>
            <hr>
            <input required id="commit-msg-input" name="commit-msg" placeholder="BranchName" type="text"/>
            <button type="submit" class="submit-btn">Send</button>
            <button onclick="hideDiv()" class="cancel-btn">Cancel</button>
        </form>
    </div>
</div>
<div class="popup-wrapper" >
    <div id="popup-login" class="form-container">
        <form action="/login" id="form-login" class="popup-form" method="post" name="form">
            <img id="close" src="images/3.png" onclick="hideDiv()">
            <h2>Contact Us</h2>
            <hr>
            <input required id="commit-msg-input" name="commit-msg" placeholder="BranchName" type="text"/>
            <button type="submit" class="submit-btn">Send</button>
            <button onclick="hideDiv()" class="cancel-btn">Cancel</button>
        </form>
    </div>
</div>`;

$(document).ready(function () {
    let el = document.querySelector('div#swagger-editor');
    let wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'page-container');
    let buttonBox = document.createElement('div');
    buttonBox.setAttribute('id', 'specific-button-container');
    buttonBox.innerHTML = `<button id="new-branch-btn" class="specific-button">New Branch</button>
                           <button id="commit-btn" class="specific-button">Commit</button>
                           <button id="push-btn" class="specific-button">Push</button>`;
    $('body').append(htmlString);
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(buttonBox);
    wrapper.appendChild(el);
    document.getElementById("new-branch-btn").addEventListener("click", showDiv);
    addFormSubmitEvent();
});


function showDiv() {
    $('#commit-form-wrapper').css('display', 'block');
    $('#page-container').css('opacity', '0.5');
}

function hideDiv() {
    $('#commit-form-wrapper').css('display', 'none');
    $('#page-container').css('opacity', '1');
}

function sendCommitForm() {
    const formElement = document.querySelector("#form-commit");
    const request = new XMLHttpRequest();
    request.open("POST", "commit");
    request.send(new FormData(formElement));
}

function addFormSubmitEvent() {
    $('.popup-form').submit(function (e) {
        e.preventDefault();
        const post_url = $(this).attr("action");
        const request_method = $(this).attr("method");
        const form_data = $(this).serializeArray();

        $.ajax({
            url: `${window.location.protocol}//${window.location.host}${post_url}`,
            type: request_method,
            data: form_data,
            dataType: 'json',
            contentType : 'multipart/form-data',
            success: function () {
                alert("DONE")
            },
            error : function () {
                alert("SUCKS")
            }
        });
    })

}