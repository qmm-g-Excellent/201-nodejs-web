const Cart = require('../model/cart');
const constant = require('../config/constant');
const async = require('async');

const loadItemUri = (items)=> {
  return items.map(({item, count})=> {
    return {uri: `items/${item}`, count};
  });
};

class CartController {
  getAll(req, res, next) {
    async.series({
      carts: (callback)=> {
        Cart.find({}, (err, doc)=> {
          if (err) {
            return next(err);
          }
          let carts = doc.map((item)=> {
            let cart = item.toJSON();
            cart.items = loadItemUri(cart.items);
            return cart;
          });
          callback(null, carts);
        });
      },
      totalCount: (callback)=> {
        Cart.count(callback);
      }
    }, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
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
      cart.items = loadItemUri(items);
      return res.status(constant.httpCode.OK).send(cart);
    })

  }

  addCart(req, res, next) {
    const cart = req.body;
    new Cart(cart).save((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(201).send({uri: `carts/${doc._id}`});
    })
  }

  deleteCart(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndRemove({_id: cartId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  updateCart(req, res, next) {
    const cartId = req.params.cartId;
    Cart.update({_id: cartId}, req.body, (err, cart) => {
      if (err) {
        return next(err);
      }
      if (!cart) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      res.sendStatus(constant.httpCode.CREATED);
    })
  }
}

module.exports = CartController;