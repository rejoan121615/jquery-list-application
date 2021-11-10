$(document).ready(function () {
  $.ajax({
    url: "http://localhost:10010/wp-json/wp/v2/posts",
    type: "GET",
  }).done(function (data) {
    data.forEach((item, index) => {
      console.log(item);
      console.log(index);
    })
  }).fail(function () {
    console.log(this)
    console.log("fail to get data");
  })
});