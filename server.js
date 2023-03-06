const express = require('express');
const path = require('path');

//Initiallizing the app varible
const app = express();
const PORT = 3001;

//Middleware
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/hot-topics", (req, res) => {
    res.sendFile(path.join(__dirname, "topics.html"));
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

