const app = require("./index")

const PORT = process.env.PORT || 3600
app.listen(PORT,()=> console.info(`El servidor se inicio en el puerto ${PORT}`))