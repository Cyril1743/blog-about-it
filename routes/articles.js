const articles = require("express").Router()
const path = require("path")
const fs = require("fs")

articles.get("/", (req, res) => {
    res.render(path.join(__dirname, "../public/html/articles.html"))
})

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
                if (element.id == req.params.id){
                    fs.readFile(path.join(__dirname,`../db/articles/${element.name}`), "utf-8", (err, data) => err ? res.status(404) : res.json(data))
                }
        });
    })
})

module.exports = articles