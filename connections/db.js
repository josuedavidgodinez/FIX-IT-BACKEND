const mongo_client = require('mongodb').MongoClient;
assert = require('assert');
const config = require('../configs/configs');

connect = async ()=>{
    try{
    return new Promise ((resolve,reject)=>{
        try{
        let connection_string     

        
    
        connection_string = config.string_conexion

        const client = new mongo_client(connection_string);

        client.connect(
        (err) => {               
            if(err){
                console.log(err)
                return reject('error : ' + err)
            }     
            console.log('Conect to database')
           
            return resolve(client)
           
    
        } 
 
)
    }catch(ex){
        return reject('error : ' + ex)
    }
})
    }catch(ex){

        console.log(ex)
        
        return res.status(500).json(ex);
    }
}


module.exports=connect





