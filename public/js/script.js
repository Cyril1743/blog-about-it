
if (window.location.pathname === "/articles") {
    fetch("/articles/api")
        .then((response) => response.json())
        .then((data) => {
            var articleDiv = $("#articles")
            console.log(articleDiv)
            var parsedData = JSON.parse(data)
            parsedData.forEach(element => {
                var newArticle =
                    `<div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5> \n`
                fetch(`/articles/api/${element.id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        var dataString = JSON.parse(data)
                        if (data.length > 100) {
                            newArticle +=
                                ` <p class="card-text">${dataString.substring(0, 100) + "..."}</p>
                                <a href="/articles/id/${element.id}" class="btn btn-primary">Read More</a>
                                </div>
                            </div>`
                            articleDiv.append(newArticle)
                        } else {
                            newArticle += ` <p class="card-text">${dataString}</p>
                                        </div>
                                    </div>`
                            articleDiv.append(newArticle)
                        }
                    })
            });
        })
}