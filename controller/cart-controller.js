const Cart = require('../model/cart');
const constant = require('../config/constant');
const async = require('async');

const mapItemToUri = (items)=> {
  return items.map(({item, count})=> {
    return {uri: `items/${item}`, count};
  });
};

class CartController {
  getAll(req, res, next) {
    async.series({
      carts: (done)=> {
        Cart.find({}, (err, docs)=> {
          if (err) {
            return done(err);
          }
          let carts = docs.map((doc)=> {
            let cart = doc.toJSON();
            cart.items = mapItemToUri(cart.items);
            return cart;
          });
          done(null, carts);
        });
      },
      totalCount: (done)=> {
        Cart.count(done);
      }
    }, (err, docs)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(docs);
    });
  }

  getOne(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findById(cartId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      let cart = doc.toJSON();
      let items = cart.items;
      cart.items = mapItemToUri(items);
      return res.status(constant.httpCode.OK).send(cart);
    })

  }

  create(req, res, next) {
    const cart = req.body;
    new Cart(cart).save((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(201).send({uri: `carts/${doc._id}`});
    })
  }

  delete(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findByIdAndRemove(cartId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  update(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findByIdAndUpdate(cartId, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
     return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }
}

module.exports = CartController;