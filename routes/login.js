const login = require("express").Router()
const path = require("path")
const fs = require("fs")

login.get("/", (req, res) => {
    res.render(path.join(__dirname, "../public/html/login.html"));
})

//Get route for getting the current users
login.post("/users", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/users.json"), 'utf-8', async (err, data) => {
        if (err) return res.status(404)
        var parsedData = JSON.parse(data)
        var user = parsedData.find(user => user.username === req.body.username);
        if (user == null) {
            return res.status(401).json("No such user");
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.status(200).redirect("/account");
            } else {
                res.status(404);
            }
        } catch {
            res.status(500).json("No such user");
        }
    }
    )
})

module.exports = login