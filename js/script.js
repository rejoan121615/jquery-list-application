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
    })
});
