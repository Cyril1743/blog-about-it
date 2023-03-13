const articles = require("express").Router()
const path = require("path")
const fs = require("fs")
const tags = ["test","css","html","javascript"]

articles.get("/", (req, res) => {
    res.render(path.join(__dirname, "../public/html/articles.html"))
})
//TODO: articles.get "/:id" return articles page with the article with the id
//TODO: articles.get "/tag/:tag_name to send to a page with the associtaed articles"
articles.get("/api", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/articles.json"), "utf-8", (err, data) => {
        if (err) return res.status(500).json(err)
        res.status(200).json(data)
    })
})

articles.get("/api/:id", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/articles.json"), "utf-8", (err, data) => {
        if (err) return res.status(500).json(err)
        var parsedData = JSON.parse(data)
        parsedData.forEach(element => {
            if (element.id == req.params.id) {
                fs.readFile(path.join(__dirname, `../db/articles/${element.name}`), "utf-8", (err, data) => err ? res.status(404) : res.json(data))
            }
        });
    })
})
articles.get("/user/only/:user", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/articles.json"), "utf-8", (err, data) => {
        if (err) return res.status(400).json(err)
        var parsedData = JSON.parse(data)
        var response = []
        parsedData.forEach(element => {
            if (element.user === req.params.user) {
                response.push(element)
            } else {
                return res.status(404).json("No such user")
            }
        })
        res.status(200).json(response)
    })
})
articles.get("/tags", (req, res) => {
    res.status(200).json(tags)
})

articles.get("/user/*", (req, res) => {
    res.render(path.join(__dirname, "../public/html/articlesuser.html"))
})

//TODO: articles.post use crypto.randomUUID() to generate random names for the files
articles.post("/", (req, res) => {
    var newArticle = {}
    console.log()
    //newArticle.title = req.
})
module.exports = articles