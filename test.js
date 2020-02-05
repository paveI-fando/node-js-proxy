const htmlString = `
<div class="popup-wrapper" id="branch-form-wrapper">
    <div id="popup-branch" class="form-container">
        <form action="/branch" id="form-branch" class="popup-form" method="post" name="form">
            <h2>Contact Us</h2>
            <hr>
            <input required id="branch-name-input" name="branch-name" placeholder="Branch name" type="text"/>
            <button type="submit" class="submit-btn">Send</input>
            <button type="reset" onclick="hideDiv('#branch-form-wrapper')" class="cancel-btn">Cancel</button>
        </form>
    </div>
</div>
<div class="popup-wrapper" id="commit-form-wrapper">
    <div id="popup-commit" class="form-container">
        <form action="/commit" id="form-commit" class="popup-form" method="post" name="form">
            <h2>Contact Us</h2>
            <hr>
            <input required id="commit-msg-input" name="commit-msg" placeholder="Commit message" type="text"/>
            <button type="submit" class="submit-btn">Send</button>
            <button onclick="hideDiv('#commit-form-wrapper')" class="cancel-btn">Cancel</button>
        </form>
    </div>
</div>
<div class="popup-wrapper" id="push-form-wrapper">
    <div id="popup-push" class="form-container">
        <form action="/push" id="form-push" class="popup-form" method="post" name="form">
            <h2>Contact Us</h2>
            <hr>
            <input required id="commit-msg-input" name="commit-msg" placeholder="BranchName" type="text"/>
            <button type="submit" class="submit-btn">Send</button>
            <button onclick="hideDiv('#push-form-wrapper')" class="cancel-btn">Cancel</button>
        </form>
    </div>
</div>
<div class="popup-wrapper" >
    <div id="popup-login" class="form-container">
        <form action="/login" id="form-login" class="popup-form" method="post" name="form">
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
    addOnClickEvents();
    addFormSubmitEvent();
});

function addOnClickEvents() {
    $('#new-branch-btn').click(() => showDiv('#branch-form-wrapper'));
    $('#commit-btn').click(() => showDiv('#commit-form-wrapper'));
    $('#push-btn').click(() => showDiv('#push-form-wrapper'));
}

function showDiv(selector) {
    $(selector).css('display', 'block');
    $('#page-container').css('opacity', '0.5');
}

function hideDiv(selector) {
    $(selector).css('display', 'none');
    $('#page-container').css('opacity', '1');
}

function addFormSubmitEvent() {
    $('.popup-form').submit(function (e) {
        e.preventDefault();
        const url = $(this).attr("action");
        const requestMethod = $(this).attr("method");
        const formDataArray = $(this).serializeArray();
        let obj = {};
        $.map(formDataArray, function (k, v) {
            obj[k['name']] = k['value'];
        });
        console.log(obj);
        $.ajax({
            url: `${window.location.protocol}//${window.location.host}${url}`,
            type: requestMethod,
            data: JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json',
            success: function () {
                alert("DONE")
            },
            error: function () {
                alert("SUCKS")
            }
        });
    })

}