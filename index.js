
const express = require("express");
const app = express();
app.use(express.json());

const ordenesRoute = require('./routes/orden')

app.use('/orden',ordenesRoute)
app.use(express.static('public'))


const PORT = process.env.PORT || 3600
app.listen(PORT,()=> console.info(`El servidor se inicio en el puerto ${PORT}`))
