const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require("fs");
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 3001;
const login = require("./routes/login");
const signup = require('./routes/sign-up');
const topics = require('./routes/topics');
const articles = require('./routes/articles');

//Initiallizing the app varible
const app = express();


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/login", login)
app.use("/sign-up", signup)
app.use("/topics", topics)
app.use("/articles", articles)
app.engine('html', require('ejs').renderFile)

app.use(express.static('public'));

//Default route
app.get("/", (req, res) => {
    res.render(path.join(__dirname, "/public/html/index.html"));
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

