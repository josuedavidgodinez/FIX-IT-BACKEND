const express = require('express')
const router = express.Router()
const connect =require('../connections/db')
const functions=require('../functions/functions')
const autenticacion = require('./autenticacion')


router.get('/',autenticacion, async (req, res) => {
    try {
        const _db = await connect()

        const collection = _db.collection("Ordenes");       

        collection.find().toArray(function(err, result) {
            if (err) throw err;
            _db.close();
            return res.status(200).json(result)
          });      

    } catch (error) {
        console.log(error)
        _db.close();
        return res.status(500).json(error);

    }

})

router.get('/:id', autenticacion,async (req, res) => {
    try {
        const _db = await connect()
        const id=req.params.id
        const collection = _db.collection("Ordenes");
        const query = { _id : parseInt(id) };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;

            _db.close();
            if (result.length==0){
                return res.status(404).json("Not found")
            }else{
                return res.status(200).json(result[0])
            }
            
          });     
          
    } catch (error) {
        console.log(error)
        _db.close();
        return res.status(500).json(error);

    }

})


router.delete('/:id',autenticacion, async (req, res) => {
    try {
        const _db = await connect()

        const id=req.params.id
        const collection = _db.collection("Ordenes");
        const query = { _id : parseInt(id) };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                _db.close();
                return res.status(404).json("Not found")
            }else{
                collection.remove(query,function(err, delOK) {
                    if (err) {
                        _db.close();
                        return res.status(500).json(err);                        
                    };
                    if (delOK){
                        _db.close();
                        return res.status(204).json("Document deleted");   
                    } 
                  });
            }
            
          });     
          
    } catch (error) {
        console.log(error)
        _db.close();
        return res.status(500).json(error);

    }

})

router.put('/:id', autenticacion,async (req, res) => {
    try {
        const _db = await connect()

        const id=req.params.id
        const collection = _db.collection("Ordenes");
        const query = { _id : parseInt(id) };
        const update = {
            "$push": {
            
                "user": req.body.user,
                "Repuestos" : req.body.Repuestos,
                "Total" : req.body.Total,
            }
          };
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                _db.close();
                return res.status(404).json("Not found")
            }else{
                collection.update(query,update,function(err, delOK) {
                    if (err) {
                        _db.close();
                        return res.status(500).json(err);                        
                    };
                    if (delOK){
                        _db.close();
                        return res.status(204).json("Document updated");   
                    } 
                  });
            }
            
          });     
          
    } catch (error) {
        console.log(error)
        _db.close();
        return res.status(500).json(error);

    }

})

router.post('/',autenticacion, async (req, res) => {
    try {
        const _db = await connect()

        const collection = _db.collection("Ordenes");
        let doc
       doc= await functions.Obtener_secuencial("Ordenes") 
        console.log(doc.secuencial)
        console.log(req.body.user)
        collection.insert({
            "_id" :  doc.secuencial ,
            "user": req.body.user,
            "Repuestos" : req.body.Repuestos,
            "Total" : req.body.Total,
        },
        function(err, result) {
           
            if(err) {
                console.log(err)
                _db.close();
                return res.status(500).json(err);               
            }else{
            _db.close();
            return res.status(201).json(result);                 
               
            }
        
        } ) 
    
    } catch (error) {
        console.log(error)
        _db.close();
        return res.status(500).json(error);

    }

})


module.exports = router

