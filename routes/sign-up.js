const signup = require("express").Router()
const path = require("path")
const fs = require("fs")
const bcrypt = require('bcrypt');
const flash = require('express-flash')
const session = require('express-session')

signup.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
signup.use(flash())

signup.get("/", (req, res) => {
    res.render(path.join(__dirname, "../public/html/newuser.html"));
})

signup.post("/", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/users.json"), "utf-8", async (err, data) => {
        if (err) return res.status(404).json("Bad request")
        var parsedData = JSON.parse(data)
        for (let i = 0; i < parsedData.length; i++){
            if (parsedData[i].username === req.body.username) {
                return req.flash('error', 'User already exists'), res.render(path.join(__dirname,"../public/html/newuser.html"))
            }
        }
        try {
            var id = Math.floor(Math.random() * 10000)
            var hashedPassword = await bcrypt.hash(req.body.password, 10)
            var hashedEmail = await bcrypt.hash(req.body.email, 10)
            var newUser = { username: req.body.username, password: hashedPassword, id: id, email: hashedEmail }
            parsedData.push(newUser)
            fs.writeFile(path.join(__dirname, "../db/users.json"), JSON.stringify(parsedData, null, 4), () => res.redirect("/login"))
        } catch {
            res.status(500)
        }

    })
})

module.exports = signup