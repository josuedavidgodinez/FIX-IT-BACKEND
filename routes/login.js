const express = require('express')
const router = express.Router()
const connect =require('../connections/db')
const  jwt = require('jsonwebtoken');
const config = require('../configs/configs');
const app = express();


app.set('llave', config.llave);

router.post('/',  async (req, res) => {

    try {
        const _db = await connect()

        const usuario=req.body.usuario
        const contrasena=req.body.contrasena

        const collection =  _db.collection("Usuarios");

        const query = { user : usuario, password : contrasena };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                _db.close();
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
        _db.close();
        return res.status(500).json(error);

    }


})

module.exports = router
