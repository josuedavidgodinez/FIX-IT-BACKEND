const express = require('express')
const router = express.Router()
const connect =require('../connections/db')
const functions=require('../functions/functions')
const autenticacion = require('./autenticacion')


router.get('/:user',autenticacion, async (req, res) => {
    try {
        const user = req.params.user
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const collection = _db.collection("Ordenes").aggregate([
            { "$match":
                {'user': user } },
            // Unwind the source
            { "$unwind": "$Repuestos" },
            // Do the lookup matching
            { "$lookup": {
               "from": "Repuestos",
               "localField": "Repuestos",
               "foreignField": "_id",
               "as": "repuestosObjects"
            }},
            // Unwind the result arrays ( likely one or none )
            { "$unwind": "$repuestosObjects" },
            // Group back to arrays
            { "$group": {
                "_id": "$_id",
                "user": {"$first" : "$user"},
                "Total": {"$first" :"$Total"},
                "Direccion_Entrega": {"$first" :"$Direccion_Entrega"},
                "Direccion_Facturacion": {"$first" :"$Direccion_Facturacion"},
                "Estado": {"$first" :"$Estado"},                
                "repuestos": { "$push": "$Repuestos" },
                "repuestosObjects": { "$push": "$repuestosObjects" }
            }}
        ]).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            
            return res.status(200).json(result)
          });       

    

    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }

})

router.get('/:id', autenticacion,async (req, res) => {
    try {
        const id =  parseInt(req.params.id)
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const collection = _db.collection("Ordenes").aggregate([
            { "$match":
                {'_id': id } },
            // Unwind the source
            { "$unwind": "$Repuestos" },
            // Do the lookup matching
            { "$lookup": {
               "from": "Repuestos",
               "localField": "Repuestos",
               "foreignField": "_id",
               "as": "repuestosObjects"
            }},
            // Unwind the result arrays ( likely one or none )
            { "$unwind": "$repuestosObjects" },
            // Group back to arrays
            { "$group": {
                "_id": "$_id",
                "user": {"$first" : "$user"},
                "Total": {"$first" :"$Total"},
                "Direccion_Entrega": {"$first" :"$Direccion_Entrega"},
                "Direccion_Facturacion": {"$first" :"$Direccion_Facturacion"},
                "Estado": {"$first" :"$Estado"},                
                "repuestos": { "$push": "$Repuestos" },
                "repuestosObjects": { "$push": "$repuestosObjects" }
            }}
        ]).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            if(result.length===0) return res.status(404).json("Not found")            
            return res.status(200).json(result[0])
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
        const collection = _db.collection("Ordenes");
        const query = { _id : parseInt(id) };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                db.close();
                return res.status(404).json("Not found")
            }else{
                collection.deleteOne(query,function(err, delOK) {
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
        const collection = _db.collection("Ordenes");
        const query = { _id : parseInt(id) };
        const update = {
            "$set": {
            
                "user": req.body.user,
                "Repuestos" : req.body.Repuestos,
                "Total" : req.body.Total,
                "Direccion_Entrega" : req.body.dir_entrega,
                "Direccion_Facturacion" : req.body.dir_factura,
                "Estado" : req.body.estado
            }
          };
        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length==0){
                db.close();
                return res.status(404).json("Not found")
            }else{
                collection.updateOne(query,update,function(err, delOK) {
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

        const collection = _db.collection("Ordenes");
        let doc
       doc= await functions.Obtener_secuencial("Ordenes") 
        
        collection.insertOne({
            "_id" :  doc.value.secuencial ,
            "user": req.body.user,
            "Repuestos" : req.body.Repuestos,
            "Total" : Math.round(req.body.Total * 100) / 100,
            "Direccion_Entrega" : req.body.dir_entrega,
            "Direccion_Facturacion" : req.body.dir_factura,
            "Estado" : req.body.estado

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

