const express = require('express')
const router = express.Router()
const connect = require('../connections/db')


let Obtener_secuencial = function (_coleccion) {
  return new Promise( async function (resolve, reject){
    try {
      const _db = await connect()
      const collection = _db.collection("Secuencial");


      collection.findAndModify(
        { "coleccion": _coleccion },
        [["coleccion", 1]],
        { "$inc": { "secuencial": 1 } },
        { new: true },
        function (err, doc) {
          resolve(doc)
        }
      );

    } catch (error) {
      reject(error)
      return -1

    }

  });
}


let Buscar_usuario = function (_coleccion) {
  return new Promise( async function (resolve, reject){
    try {
      const _db = await connect()
      const collection = _db.collection("Secuencial");


      collection.findAndModify(
        { "coleccion": _coleccion },
        [["coleccion", 1]],
        { "$inc": { "secuencial": 1 } },
        { new: true },
        function (err, doc) {
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