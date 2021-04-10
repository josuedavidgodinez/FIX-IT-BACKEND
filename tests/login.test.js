const request = require('supertest')
const app = require('../index')




describe('Pruebas de login',()=>{    
     test('should sing in a user', async (done) => {
    await request(app).post('/login')
    .send({
        usuario: "test",
        contrasena: "testing"
    }).expect(200)
    done()
    

})





})
    
   

