const express = require('express')
const  jwt = require('jsonwebtoken');
const config = require('../configs/configs');

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];


   
    if (token) {
      jwt.verify(token, config.llave, (err, decoded) => {    
         
        if (err) {
            return res.status(401).json("token invalida , no autorizado para ingresar");   
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
        return res.status(404).json("token no proveida");
    }
 });

 module.exports = rutasProtegidas