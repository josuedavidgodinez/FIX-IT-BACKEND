const express = require('express')
const router = express.Router()
const connect =require('../connections/db')
const  jwt = require('jsonwebtoken');
const config = require('../configs/configs');
const app = express();


app.set('llave', config.llave);

router.post('/',  async (req, res) => {

    try {
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const usuario=req.body.usuario
        const contrasena=req.body.contrasena

        const collection =  _db.collection("Usuarios");

        const query = { user : usuario, password : contrasena };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                db.close();
                return res.status(404).json("Usuario o contraseña incorrectos")
            }else{
                    const payload = {
                     usuario: usuario
                    };
                    const token = jwt.sign(payload, app.get('llave'), {
                     expiresIn: 2000
                    });

                    return res.status(200).json({
                        mensaje: 'Autenticación correcta',
                        token: token
                       })                      
            }            
          });

    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }


})

router.post('/re_sign',  async (req, res) => {

    try {
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const usuario=req.body.usuario

        const collection =  _db.collection("Usuarios");

        const query = { user : usuario};

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                db.close();
                return res.status(404).json("Usuario incorrectos")
            }else{
                    const payload = {
                     usuario: usuario
                    };
                    const token = jwt.sign(payload, app.get('llave'), {
                     expiresIn: 2000
                    });

                    return res.status(200).json({
                        mensaje: 'Autenticación correcta',
                        token: token
                       })                      
            }            
          });

    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }


})

module.exports = router
