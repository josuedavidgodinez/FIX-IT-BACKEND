
const express = require("express");
const app = express();
const  jwt = require('jsonwebtoken');
const config = require('./configs/configs');
const mongo = require('./connections/db')

app.use(express.json());


app.set('llave', config.llave);

const ordenesRoute = require('./routes/orden')

app.use('/orden',ordenesRoute)
app.use(express.static('public'))


const PORT = process.env.PORT || 3600
app.listen(PORT,()=> console.info(`El servidor se inicio en el puerto ${PORT}`))



app.post('/autenticar', (req, res) => {

    try {
        const usuario=req.body.usuario
        const contrasena=req.body.contrasena

        const collection = mongo._db.collection("Usuarios");

        const query = { user : usuario, password : contrasena };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                mongo._db.close();
                return res.status(404).json("Usuario o contraseña incorrectos")
            }else{
                    const payload = {
                     check:  true
                    };
                    const token = jwt.sign(payload, app.get('llave'), {
                     expiresIn: 1440
                    });

                    return res.status(200).json({
                        mensaje: 'Autenticación correcta',
                        token: token
                       })
                      
            }
            
          });    


 
          
    } catch (error) {
        console.log(error)
        mongo._db.close();
        return res.status(500).json(error);

    }


})
