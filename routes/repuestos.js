const express = require('express')
const router = express.Router()
const connect =require('../connections/db')
const functions=require('../functions/functions')
const autenticacion = require('./autenticacion')



router.get('/:id', autenticacion,async (req, res) => {
    try {
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const id=req.params.id
        const collection = _db.collection("Repuestos");
        const query = { _id : parseInt(id) };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;

            db.close();
            if (result.length==0){
                return res.status(404).json("Not found")
            }else{
                return res.status(200).json(result[0])
            }
            
          });     
          
    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }

})


router.delete('/:id',autenticacion, async (req, res) => {
    try {
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const id=req.params.id
        const collection = _db.collection("Repuestos");
        const query = { _id : parseInt(id) };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                db.close();
                return res.status(404).json("Not found")
            }else{
                collection.remove(query,function(err, delOK) {
                    if (err) {
                        db.close();
                        return res.status(500).json(err);                        
                    };
                    if (delOK){
                        db.close();
                        return res.status(204).json("Document deleted");   
                    } 
                  });
            }
            
          });     
          
    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }

})

router.put('/:id', autenticacion,async (req, res) => {
    try {
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const id=req.params.id
        const collection = _db.collection("Repuestos");
        const query = { _id : parseInt(id) };
        const update = {
            "$set": {
            
                "codigo":req.body.codigo,
                "nombre":req.body.nombre,
                "precio":req.body.precio,
                "img":req.body.img,
                "precio_oferta":req.body.precio_oferta
            }
          };
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                db.close();
                return res.status(404).json("Not found")
            }else{
                collection.update(query,update,function(err, delOK) {
                    if (err) {
                        db.close();
                        return res.status(500).json(err);                        
                    };
                    if (delOK){
                        db.close();
                        return res.status(204).json("Document updated");   
                    } 
                  });
            }
            
          });     
          
    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }

})

router.post('/',autenticacion, async (req, res) => {
    try {
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const collection = _db.collection("Repuestos");
        let doc
       doc= await functions.Obtener_secuencial("Repuestos") 
       
        collection.insertOne({

            "_id":  doc.value.secuencial,
            "codigo":req.body.codigo,
            "nombre":req.body.nombre,
            "img":req.body.img,
            "precio":req.body.precio,
            "precio_oferta":req.body.precio_oferta
        },
        function(err, result) {
           
            if(err) {
                console.log(err)
                db.close();
                return res.status(500).json(err);               
            }else{
                db.close();
            return res.status(201).json(result);                 
               
            }
        
        } ) 
    
    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }

})


module.exports = router