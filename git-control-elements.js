const htmlString = `
<div class="popup-wrapper" id="branch-form-wrapper">
    <div id="popup-branch" class="form-container">
        <form action="/branch" id="form-branch" class="popup-form" method="post" name="form">
            <h2>New branch</h2>
            <hr>
            <select id="select-checkout-from" name="branch-from">
            </select>
            <input required id="branch-name-input" name="branch-name" placeholder="Branch name" type="text"/> 
            <div class="form-button-box">
                <button type="submit" class="submit-btn">Send</input>
                <button type="reset" onclick="hideDiv('#branch-form-wrapper')" class="cancel-btn">Cancel</button>
            </div>
        </form>
    </div>
</div>
<div class="popup-wrapper" id="commit-form-wrapper">
    <div id="popup-commit" class="form-container">
        <form action="/commit" id="form-commit" class="popup-form" method="post" name="form">
            <h2>Commit</h2>
            <hr>
            <input required id="commit-msg-input" name="commit-msg" placeholder="Commit message" type="text"/>
            <div class="form-button-box">
                <button type="submit" class="submit-btn">Send</button>
                <button type="reset" onclick="hideDiv('#commit-form-wrapper')" class="cancel-btn">Cancel</button>
            </div>
        </form>
    </div>
</div>
<div class="popup-wrapper" id="checkout-form-wrapper">
    <div id="popup-push" class="form-container">
        <form action="/checkout" id="form-checkout" class="popup-form" method="post" name="form">
            <h2>Checkout</h2>
            <hr>
            <select id="select-branch-for-checkout" name="branch-name"></select>
            <div class="form-button-box">
                <button type="submit" class="submit-btn">Send</button>
                <button type="reset" onclick="hideDiv('#checkout-form-wrapper')" class="cancel-btn">Cancel</button>
            </div>
        </form>
    </div>
</div>
<div class="popup-wrapper" id="login-form-wrapper">
    <div id="popup-login" class="form-container">
        <form action="/login" id="form-login" class="popup-form" method="post" name="form">
            <h2>Login</h2>>
            <hr>
            <input required id="username-input" name="username" placeholder="username" type="text"/>
            <input required id="password-commit-msg-input" name="password" placeholder="password" type="password"/>
            <div class="form-button-box">
                <button type="submit" class="submit-btn">Send</button>
                <button type="reset" onclick="hideDiv('#login-form-wrapper')" class="cancel-btn">Cancel</button>
            </div>    
        </form>
    </div>
</div>
<div id="error-message-container">
    <span id="error-text"></span>
</div>`;

$(document).ready(function () {
    let el = document.querySelector('div#swagger-editor');
    let wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'page-container');
    let buttonBox = document.createElement('div');
    buttonBox.setAttribute('id', 'specific-button-container');
    buttonBox.innerHTML = `<button id="new-branch-btn" class="specific-button">New Branch</button>
                           <button id="commit-btn" class="specific-button">Commit</button>
                           <button id="push-btn" class="specific-button">Push</button>
                           <button id="checkout-btn" class="specific-button">Checkout</button>`;

    $('body').append(htmlString);
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(buttonBox);
    wrapper.appendChild(el);
    addOnClickEvents();
    addFormSubmitEvent();
});

function addOnClickEvents() {
    $('#new-branch-btn').click(() => {
        getAllBranches('#select-checkout-from');
        showDiv('#branch-form-wrapper')
    });
    $('#push-btn').click(() => checkRemotes());
    $('#commit-btn').click(() => showDiv('#commit-form-wrapper'));
    $('#checkout-btn').click(() => {
        getAllBranches('#select-branch-for-checkout');
        showDiv('#checkout-form-wrapper')
    });

}

function getAllBranches(selector) {
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/allBranches`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            res['all'].forEach((el) => {
                $(selector).append(`<option>${el}</option>>`)
            });
        },
        error: function (res) {
            showError(res.responseText);
        }
    });
}

function checkRemotes() {
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/remotes`,
        type: "GET",
        dataType: 'json',
        success: function (res) {
            res.isRemoteDefined ? pushChanges() : showDiv('#login-form-wrapper');
        },
        error: function (res) {
            showError(res.responseText)
        }
    });
}

function pushChanges() {
    $.ajax({
        url: `${window.location.protocol}//${window.location.host}/push`,
        type: "POST",
        dataType: 'text',
        success: function () {
            location.reload();
        },
        error: function (res) {
            showError(res.responseText)
        }
    });
}

function showDiv(selector) {
    $(selector).css('display', 'flex');
    $('#page-container').css('opacity', '0.5');
}

function hideDiv(selector) {
    $(selector).css('display', 'none');
    $('#page-container').css('opacity', '1');
    hideError();
}

function addFormSubmitEvent() {
    $('.popup-form').submit(function (e) {
        e.preventDefault();
        hideError();
        const url = $(this).attr('action');
        const requestMethod = $(this).attr('method');
        const formDataArray = $(this).serializeArray();
        let obj = {};
        $.map(formDataArray, function (k, v) {
            obj[k['name']] = k['value'];
        });
        $.ajax({
            url: `${window.location.protocol}//${window.location.host}${url}`,
            type: requestMethod,
            data: JSON.stringify(obj),
            contentType: 'application/json',
            success: function () {
                location.reload();
            },
            error: function (res) {
                showError(res.responseText)
            },
        });
    });
}

function showError(errorText) {
    $('#error-text').text(errorText);
    $('#error-message-container').css('display', 'block')
}

function hideError() {
    $('#error-message-container').css('display', 'none')
}