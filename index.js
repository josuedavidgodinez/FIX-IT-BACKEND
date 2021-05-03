
const express = require("express");
const app = express();
app.use(express.json());




const ordenesRoute = require('./routes/orden')
const repuestosRoute = require('./routes/repuestos')
const usuarios = require('./routes/users')
const repuestos_todos = require('./routes/repuestos_todos')

const Login = require('./routes/login')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,access-token,access-user");
    next();
  });
  
app.use('/repuesto',repuestosRoute)
app.use('/orden',ordenesRoute)
app.use('/login',Login)
app.use('/users',usuarios)
app.use('/repuestos',repuestos_todos)


app.use(express.static('public'))

module.exports = app
