require('should');
const supertest = require("supertest");
const app = require("../../app");
const requtest = supertest(app);
const constant = require("../../config/constant");
const Cart = require("../../model/cart");

describe('CartController', ()=> {
  it('GET /carts should return all carts', (done)=> {
    requtest
        .get('/carts')
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.totalCount.should.equal(2);
        })
        .end(done);
  });

  it('GET /carts/:cartId should return a cart', (done)=> {
    const cartId = '587f0f2586653d19297d40c6';
    requtest
        .get(`/carts/${cartId}`)
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.should.eql({
            "_id": "587f0f2586653d19297d40c6",
            "userId": "1",
            "__v": 0,
            "items": [
              {
                "uri": "items/587f0f2586653d19297d40c2",
                "count": 1
              },
              {
                "uri": "items/587f0f2586653d19297d40c3",
                "count": 1
              },
              {
                "uri": "items/587f0f2586653d19297d40c4",
                "count": 1
              }
            ]
          })
        })
        .end(done);
  });

 it('POST /carts should return 201', (done)=>{
   const cart = {
     userId: '88',
     items: [
       {
         item: '587f0f2586653d19297d40c2',
         count: 2
       }
     ]
   };
   requtest
       .post('/carts')
       .send(cart)
       .expect(constant.httpCode.CREATED)
       .expect((res)=>{
         Cart.findOne({userId:'88'},(err, doc)=>{
           res.body.uri.should.equal(`carts/${doc._id}`);
         });
       })
       .end(done);
 });

  it('DELETE /carts/:cartId should return 204', (done)=>{
    const cartId = '587f0f2586653d19297d40c7';
    requtest
        .delete(`/carts/${cartId}`)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });

  it('PUT /carts/:cartId should return 204', (done)=>{
    const cartId = '587f0f2586653d19297d40c6';
    const cart = {
      userId: '9',
      items: [
        {
          count: 4,
          item: '587f0f2586653d19297d40c2'
        }
      ]
    };
    requtest
        .put(`/carts/${cartId}`)
        .send(cart)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });
});