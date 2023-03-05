const express = require('express')
const mysql = require('mysql2')

//Initiallizing the app varible
const app = express()
const PORT = process.env.PORT || 3001

//Middleware
app.use(express.json)

app.use(express.static('public'))

