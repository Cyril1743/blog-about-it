const express = require('express');
const bcrypt = require('bcrypt')
const path = require('path');
const fs = require("fs")
const PORT = process.env.PORT || 3001

//Initiallizing the app varible
const app = express();


//Middleware
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

//Default routes
app.get('/', (req, res) => {
    res.sendFile("index.html");
})
app.get("/hot-topics", (req, res) => {
    res.sendFile(path.join(__dirname, "topics.html"));
})
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"))
})
//Get route for getting the current users
app.post("/login/users", (req, res) => {
    fs.readFile("/db/users.json", 'utf-8', async (data) => {
            var user = data.find(user => user.name === req.body.username)
            if (user == null){
                return res.status(401).json("No such user")
            }
            try {
                if(await bcrypt.compare(req.body.password, user.password)){
                    res.status(200)
                } else {
                    res.status(404)
                }
            } catch {
                res.status(500).json("No such user")
            }
        }
    )
})

app.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, "newuser.html"))
})

app.post("/sign-up", (req, res) => {
    fs.readFile("/db/users.json", "utf-8", async (data) =>{
        var parsedData = JSON.parse(data)
        var userAvailable = parsedData.find(user => user.name === req.body.username)
        if (userAvailable !== null) {
            return res.status(403).json("User already exists")
        }
        try {
            var hashedPassword = await bcrypt.hash(req.body.password, 10)
            var newUser = {username: req.body.username, password: hashedPassword, id: Math.floor(Math.random * 10000), email: req.body.email}
            parsedData.push(newUser)
            fs.writeFile("/db/users.json", JSON.stringify(parsedData, null, 4), () => res.redirect("/login"))
        } catch {
            res.status(500)
        }

    })
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

