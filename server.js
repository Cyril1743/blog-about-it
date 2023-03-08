const express = require('express');
const path = require('path');
const fs = require("fs")

//Initiallizing the app varible
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Default routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/index.html"));
})
app.get("/hot-topics", (req, res) => {
    res.sendFile(path.join(__dirname, "topics.html"));
})
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"))
})
//Get route for getting the current users
app.get("/login/users", (req, res) => {
    fs.readFile("/db/users.json", 'utf-8', (err, data) => err ? res.status(404).json("Unable to read data") : res.status(200).json(data))
})
app.get("/sign-up", (req, res) => {
    res.sendFile(path.join(__dirname, "newuser.html"))
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

