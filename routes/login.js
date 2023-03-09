const express = require("express")
const login = express.Router()
const path = require("path")
const fs = require("fs")
const bcrypt = require('bcrypt');
const flash = require("express-flash")
const session = require("express-session");

login.use(flash())
login.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false
    }
}))
login.use(express.urlencoded({ extended: false }))

login.get("/", (req, res) => {
    res.render(path.join(__dirname, "../public/html/login.html"));
})

login.get("/account", (req, res) => {
    if (req.session.user) res.render(path.join(__dirname, "../public/html/account.html"), { name: req.session.user })
    else res.render(path.join(__dirname, "../public/html/login.html"), { error: "Must be logged in to view website" })
})
//Get route for getting the current users
login.post("/", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/users.json"), "utf-8", async (err, data) => {
        if (err) return res.status(500).flash("error", err)
        var parsedData = JSON.parse(data)
        for (let i = 0; i < parsedData.length; i++) {
            if (parsedData[i].username === req.body[0].username) {
                console.log(parsedData[i].password, req.body[0].password)
                if ( await bcrypt.compare(req.body[0].password, parsedData[i].password)) {
                    return res.status(404), req.flash('error', "Invalid password")
                } else {
                req.session.regenerate((err) => {
                    if (err) next(err)
                    req.session.user = req.body[0].username
                    req.session.save((err) => {
                        if (err) next(err)
                        res.redirect("/login/account")
                    })

                })}
            } else {
                res.status(404)
                req.flash("error", "Invalid password")
            }
        }

    })

})

module.exports = login