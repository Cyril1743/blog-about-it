fetch("/articles/api")
    .then((response) => response.json())
    .then((data) => {
        var articleDiv = $("#articles")
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
                                <div class ="card-footer">
                                <h6> Tags </h6>`
                        //Utalize the tags to make buttons leading to articles/tag/tag_name
                        for (let i = 0; i < element.tags.length; i++) {
                            console.log(element.tags[i])
                            newArticle += `\n <a class="btn btn-success" href="/acrticles/tag/${element.tags[i]}"> ${element.tags[i]} </a>`
                        }
                        newArticle += `
                            \n </div> <a href="/articles/user/${element.user}"> Posted by: ${element.user} </a>
                            \n </div>
                            <div>`
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