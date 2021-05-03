const express = require('express')
const router = express.Router()
const connect = require('../connections/db')


let Obtener_secuencial = function (_coleccion) {
  return new Promise( async function (resolve, reject){
    try {
      const db=await connect()    
        const _db=db.db("DB_FIX_IT")
      const collection = _db.collection("Secuencial");


      collection.findOneAndUpdate(
        { "coleccion": _coleccion },
        { "$inc": { "secuencial": 1 } },
        { new: true  , upsert: true, returnOriginal: false},
        function (err, doc) {
          console.log(doc)
          resolve(doc)
        }
      );

    } catch (error) {
      reject(error)
      return -1

    }

  });
}












exports.Obtener_secuencial = Obtener_secuencial