const mongo_client = require('mongodb').MongoClient;
assert = require('assert');


     mongo_client.connect('mongodb://localhost:27017/DB_FIX_IT',
    (err, client) => {
        assert.equal(null, err);
        assert.ok(client != null);            
        module.exports._db=client
        console.log('Conect to database')

    }
)





