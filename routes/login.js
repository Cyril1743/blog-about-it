const login = require("express").Router()
const path = require("path")
const fs = require("fs")
const bcrypt = require('bcrypt');
const passport = require('passport')
const init = require("../passport-cofig")
const flash = require("express-flash")
const session = require("express-session")

init(passport, (username) => {
    fs.readFile(path.join(__dirname, "/db/users.json"), "utf-8", (err, data) => {
        if (err) return err
        var parsedData = JSON.parse(data)
        return user = parsedData.find(user => user.username === username)
    })
}, (id) => {
    fs.readFile(path.join(__dirname,"/db/users.json"), "utf-8", (err, data) => {
        if (err) return err
        var parsedData = JSON.parse(data)
        return userId = parsedData.find(user => user.id === id)
    })
})

login.use(flash())
login.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
login.use(passport.initialize())
login.use(passport.session())

login.get("/", (req, res) => {
    res.render(path.join(__dirname, "../public/html/login.html"));
})

login.get("/account", checkAuth, (req, res)=> {
    res.render(path.join(__dirname,"../public/html/account.html"))
})
//Get route for getting the current users
login.post("/", passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/login',
    failureFlash: true
}))

function checkAuth(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    } else {
        res.redirect("/login")
    }
}

module.exports = login