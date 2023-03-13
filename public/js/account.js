var logoutButton = document.getElementById("logout")
logoutButton.addEventListener("click", (event) => {
    event.preventDefault()
     fetch("/login/logout", {
        method: 'DELETE'
    }).then(window.location.replace("/"))
})

var submitButton = $("#submit")
submitButton.on("click", (event) => {
    event.preventDefault()
    var title = $("#title").val()
    var text = $("#text").val()
    var welcome = $("#welcome").text()
    var user = welcome.split(" ")
    fetch("/articles", {
        method: "post",
        body: {
            title: title,
            text: text,
            user: user[1]
        }
    })

})
function getTags() {
    fetch("/articles/tags")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        var label = $("#taglabel")
        data.forEach( tag => {
            var input = `<input class="form-check-input" type="checkbox" id="${tag}">`
            var inputLabel = `<label class="form-check-label" for="${tag}"> ${tag} </label>`
            label.after(inputLabel, input)
        })
    })
}
getTags()