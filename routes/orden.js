const express = require('express')
const router = express.Router()
const mongo =require('../connections/db')
const functions=require('../functions/functions')

router.get('/', async (req, res) => {
    try {
        const collection = mongo._db.collection("Ordenes");
        var query = { user : "jogodine" };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;
            mongo._db.close();
            return res.status(200).json(result)
          });      



    } catch (error) {
        console.log(error)
        mongo._db.close();
        return res.status(500).json(error);

    }

})

router.post('/', async (req, res) => {
    try {
        const collection = mongo._db.collection("Ordenes");
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
                mongo._db.close();
                return res.status(500).json(err);
                
            }else{

            mongo._db.close();
            return res.status(200).json(result);
                   
                    
               
            }
        
        } )  
        
        



    } catch (error) {
        console.log(error)
        mongo._db.close();
        return res.status(500).json(error);

    }

})


module.exports = router

