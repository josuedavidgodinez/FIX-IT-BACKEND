
const express = require("express");
const app = express();
app.use(express.json());




const ordenesRoute = require('./routes/orden')
const Login = require('./routes/login')

app.use('/orden',ordenesRoute)
app.use('/login',Login)

app.use(express.static('public'))

module.exports = app
