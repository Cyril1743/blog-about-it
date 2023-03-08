const topics = require("express").Router()
const path = require("path")
const fs = require("fs")

topics.get("/", (req, res) => {
    res.render(path.join(__dirname, "../public/html/topics.html"));
})

module.exports = topics