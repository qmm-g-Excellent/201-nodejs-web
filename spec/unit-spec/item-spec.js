require('should');
const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
const Item = require("../../model/item");
const  constant = require('../../config/constant');


describe('ItemController', ()=> {

  it('GET /items should return all  items', (done)=> {
    request
        .get('/items')
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.totalCount.should.equal(3);
        })
        .end(done);
  });

  it('GET /items/:itemId should return a item', (done)=> {
    request
        .get('/items/587f0f2586653d19297d40c2')
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.should.eql({
            "_id": "587f0f2586653d19297d40c2",
            "name": "荔枝",
            "price": 12,
            "category": {
              "_id": "587f0f2586653d19297d40c8",
              "name": "水果",
              "__v": 0
            },
            "__v": 0
          });
        })
        .end(done)
  });

  it('POST /items should return item uri', (done)=> {
    const item = {
      name: 'test',
      price: 45,
      category: '587f0f2586653d19297d40c8'
    };
    request
        .post('/items')
        .send(item)
        .expect(constant.httpCode.CREATED)
        .expect((res)=> {
          Item.findOne(item, (err, doc)=> {
            res.body.uri.should.equal(`items/${doc._id}`);
          })
        })
        .end(done);
  });

  it('DELETE /items/:itemId should reutrn 204', (done)=> {
    const itemId = '587f0f2586653d19297d40c2';
    request
        .delete(`/items/${itemId}`)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });

  it('PUT /items/:itemId should reutrn 204', (done)=> {
    const itemId = '587f0f2586653d19297d40c3';
    const price = {price: 88};
    request
        .put(`/items/${itemId}`)
        .send(price)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done);
  });


});