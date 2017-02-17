require('should');
const supertest = require("supertest");
const app = require("../../app");
const request = supertest(app);
const constant = require("../../config/constant");

const Category = require("../../model/category");

describe('CategpryController', ()=> {
  it('GET /categories should return all category', (done)=> {
    request
        .get('/categories')
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.totalCount.should.equal(2);
        })
        .end(done);
  });

  it('GET /category/:categoryId should return a category ', (done)=> {
    const categoryId = '587f0f2586653d19297d40c9';
    request
        .get(`/categories/${categoryId}`)
        .expect(constant.httpCode.OK)
        .expect((res)=> {
          res.body.should.deepEqual({
            "_id": "587f0f2586653d19297d40c9",
            "name": "零食",
            "__v": 0
          });
        })
        .end(done);
  });

  it('POST /category should return category uri', (done)=> {
    const category = {
      name: "护肤品"
    };
    request
        .post('/categories')
        .send(category)
        .expect(constant.httpCode.CREATED)
        .expect((res)=> {
          Category.findOne(category, (err, doc)=> {
            res.body.uri.should.deepEqual(`categories/${doc._id}`);
          });
        })
        .end(done);
  });

  it('DELTE /categories/:categoryId', (done)=> {
    const categoryId = '587f0f2586653d19297d40c9';
    request
        .delete(`/categories/${categoryId}`)
        .expect(constant.httpCode.BAD_REQUEST)
        .end(done);
  });

  it('PUT /categories/:categoryId should return 204', (done)=> {
    const categoryId = '587f0f2586653d19297d40c9';
    const category = {name: "护肤品"};
    request
        .put(`/categories/${categoryId}`)
        .send(category)
        .expect(constant.httpCode.NO_CONTENT)
        .end(done)

  });
});