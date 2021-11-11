$(document).ready(function () {
    var postData = [];
    // get all posts
    $.getJSON(
        "http://localhost:10010/wp-json/wp/v2/posts",
        {
            format: "json",
        },
        function (data) {
            postData = data;
            renderAllPost(postData);
        }
    );
    // post render engine
    const postRender = (data) => {
        // const para = data.excerpt.rendered;
        return `
            <div class="item posts">
                <h1 class="heading">${data.title.rendered}</h1>
                <p class="para">${$(data.excerpt.rendered).html()}</p>
                <div class="bottom">
                    <div class="left">
                        <p>${data.date}</p>
                    </div>
                    <div class="right">
                        <img src="./img/use-head.png" alt="user head short" />
                        <p>julia robert</p>
                    </div>
                </div>
            </div>
    `;
    };
    // render all post on main container
    const renderAllPost = (data) => {
        $.each(data, function (index, dataItem) {
            const posts = postRender(dataItem);
            $("#main-container").append(posts);
            $(posts).filter(".posts").css("background: green;");
        });
    };
    // append texts
});

// new post form
$("#new_post_data").submit(function (event) {
  const formData = $(this).serializeArray();
    let constUrl = `http://localhost:10010/wp-json/wp/v2/posts/?${formData[0].name}=${formData[0].value}&${formData[1].name}=${formData[1].value}&status=publish`;
    $.ajax({
        url: constUrl,
        type: "POST",
        timeout: 0,
        headers: {
            Authorization: "Basic YWRtaW46YWRtaW4=",
        },
    }).done(function (message) {
      console.log('request done successfully => ', message);
    })

    event.preventDefault();
    // ajax request
    // var settings = {
    //     url: "http://localhost:10010/wp-json/wp/v2/posts/?title=Basic authentication from Mohd-Rejoan&content=My content from for this post&status=publish",
    //     asdsf: `http://localhost:10010/wp-json/wp/v2/posts/?title=`,
    //     method: "POST",
    //     timeout: 0,
    //     headers: {
    //         Authorization: "Basic YWRtaW46YWRtaW4=",
    //     },
    // };

    // $.ajax(settings).done(function (response) {
    //     console.log(response);
    // });
});
