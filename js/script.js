// log in form ---------------------
const loginSubmitBnt = $("#log-in-form #submit");
const loginInputList = $("#log-in-form .input-group input");

// add input color

function addColor(tag) {
    if (tag.val() == "") {
        $(tag).css("border-color", "red");
    } else {
        $(tag).css("border-color", "green");
    }
}

// map all login input for error massage

$.map(loginInputList, function (items, index) {
    // check input value
    $(items).focus(function () {
        addColor($(this));
    });
    $(items).blur(function () {
        addColor($(this));
    });

    // acitvate submit btn
    $(items).keypress(function () {
        if (loginInputList[0].value != "" && loginInputList[1].value != "") {
            $("#log-in-form #submit").attr("disabled", false);
        }
    });
});

// send log in user request
function sendRequest() {
    $.ajax({
        url: "http://localhost:10010/wp-json/jwt-auth/v1/token",
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            username: loginInputList[0].value,
            password: loginInputList[1].value,
        }),
    })
        .done(function (respData, textStatus, jqXHR) {
            $("#log-in #log-in-form").fadeOut(500);
            $("#log-in-success-msg").fadeIn(500);
            setTimeout(function () {
                window.location.href = "index.html";
            }, 1500);
            // resp data loop
            Object.keys(respData).forEach((item) => {
                localStorage.setItem(item, respData[item]);
            });
        })
        .fail(function (jqHRX, textStatus, error) {
            $(".user-error-msg").remove();
            $("#log-in .container").append(
                `<p class="text-center text-danger text-capitalize mt-5 user-error-msg">${jqHRX.responseJSON.message}</p>`
            );
        });
}

// on submit btn click
$("#log-in-form #submit").click(function (e) {
    e.preventDefault();
    sendRequest();
});

// show user area or login btns

if (localStorage.token) {
    $("#user-dropdown").show();
    $("#log-register-btns").hide();
}
if (localStorage.getItem("token") == null) {
    $("#user-dropdown").hide();
    $("#log-register-btns").show();
}

// logout btn
console.log($("#log-out-btn"));
$("#log-out-btn").click(function () {
    localStorage.clear();
    window.location.href = "index.html";
});
