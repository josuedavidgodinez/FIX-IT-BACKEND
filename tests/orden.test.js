const request = require('supertest')
const app = require('../index')
let token
let id

beforeAll((done) => {
    request(app)
      .post('/login')
      .send({
        usuario: "test",
        contrasena: "testing"
      })
      .end((err, response) => {
        token = response.body.token; //se queda guardado el token
        done();
      });
  });

  

describe('Pruebas de ordenes',()=>{  

     test('should get orders', async (done) => {

    await  request(app)    
    .get("/orden")
    .set('access-token',token)
    .then(response=>{
        expect(response.statusCode).toBe(200)
        done();
    }) 

    

}),

test('should post order', async (done) => {
    await request(app).post('/orden') 
    .set('access-token',token)
    .send({
        user: "test",
        Repuestos : [5,4,5,3,9,7],
        Total : 14545.56,
        dir_entrega : "29 avenida. 14-68 ciudad de p2",
        dir_factura : "29 avenida. 14-68 ciudad de p2"
    })  
    .then(response => {
        console.log(response.body[0]._id)
    
        id=response.body[0]._id
            expect(response.statusCode).toBe(201)
            
            done();
        

      });
  
    

})
,

test('should get order by id', async (done) => {
    const ruta = "/orden/"+id
    await  request(app)    
    .get(ruta)
    .set('access-token',token)
    .then(response=>{
        expect(response.statusCode).toBe(200)
        done();
    }) 

    

}),

test('should not found order by id', async (done) => {
    const ruta = "/orden/100000"
    await  request(app)    
    .get(ruta)
    .set('access-token',token)
    .then(response=>{
        expect(response.statusCode).toBe(404)
        done();
    }) 

    

}),

test('should  update order by id', async (done) => {
    const ruta = "/orden/"+id
    await  request(app)    
    .put(ruta)
    .set('access-token',token)
    .send({
        user: "test",
        Repuestos : [5,4,5,3,9,7],
        Total : 1400.56,
        dir_entrega : "29 avenida. 14-68 test update",
        dir_factura : "29 avenida. 14-68  test update"
    })  
    .then(response=>{
        expect(response.statusCode).toBe(204)
        done();
    }) 

    

})
,

test('should  delete order by id', async (done) => {
    const ruta = "/orden/"+id
    await  request(app)    
    .delete(ruta)
    .set('access-token',token)
    .then(response=>{
        expect(response.statusCode).toBe(204)
        done();
    }) 

    

})










})