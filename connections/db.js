const mongo_client = require('mongodb').MongoClient;
assert = require('assert');

connect = async ()=>{
    return new Promise ((resolve,reject)=>{
        let connection_string 

        const ambiente=process.env.NODE_ENV

        console.log(ambiente)
        if(ambiente=="produccion")
        {
            connection_string = 'mongodb://mongodb:27017/DB_FIX_IT'

        }else{
            connection_string = 'mongodb://localhost:27017/DB_FIX_IT'
        }

        mongo_client.connect(connection_string,
        (err, client) => {
            assert.equal(null, err);
            assert.ok(client != null);      
            if(err){
                return reject('error : ' + err)
            }     
            console.log('Conect to database')
            return resolve(client)
           
    
        } 
 
)
})
}


module.exports=connect





