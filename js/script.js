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
        return `
            <div class="item posts">
                <h1 class="heading">${data.title.rendered}</h1>
                <p class="para">${data.excerpt.rendered}</p>
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
    })
  }

  // append texts 
  
});
