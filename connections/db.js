const mongo_client = require('mongodb').MongoClient;
assert = require('assert');

connect = async ()=>{
    return new Promise ((resolve,reject)=>{

        mongo_client.connect('mongodb://localhost:27017/DB_FIX_IT',
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





