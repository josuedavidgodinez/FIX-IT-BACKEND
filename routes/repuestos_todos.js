const express = require('express')
const router = express.Router()
const connect =require('../connections/db')

router.get('/', async (req, res) => {
    try {
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")


        const collection = _db.collection("Repuestos");       

        collection.find().toArray(function(err, result) {
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


module.exports = router