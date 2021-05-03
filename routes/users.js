const express = require('express')
const router = express.Router()
const connect =require('../connections/db')
const config = require('../configs/configs');
const  jwt = require('jsonwebtoken');

const app = express();

//registrarse
app.set('llave', config.llave);

router.post('/', async (req, res) => {
    try {
        const db=await connect()      
        console.log(db) 
        const _db=db.db("DB_FIX_IT")
        
        

        const collection = _db.collection("Usuarios");
        collection.insert({
            "user": req.body.user,
            "password" : req.body.password

        },
        function(err, result) {
           
            if(err) {
                console.log(err)
                _db.close();
                return res.status(500).json(err);               
            }else{
            _db.close();

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
        
        } ) 
    
    } catch (error) {
        console.log(error)
        _db.close();
        return res.status(500).json(error);

    }

})

module.exports = router