//Node modules
const express = require('express');
const path = require('path');
const fs = require("fs");
const passport = require("passport")
const dotenv = require("dotenv").config()
const flash = require("express-flash")
const session = require("express-session")


//Consts for app set up
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
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.engine('html', require('ejs').renderFile)

app.use(express.static('public'));

//Default route
app.get("/", (req, res) => {
    res.render(path.join(__dirname, "/public/html/index.html"));
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

