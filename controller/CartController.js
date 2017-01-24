import Cart from '../models/cart';
import Item from '../models/item';
import async from 'async';

export default class CartController {
  getAll(req, res, next) {
    Cart.find({}, (err, carts)=> {
      if (err) {
        return next(err);
      }
      res.status(200).send(carts);
    })
  }

  getCart(req, res, next) {
    const cartId = req.params.cartId;
    Cart.aggregate()
        .unwind('$carts')
        .match({'carts.cartId': cartId})
        .exec((err, cart) => {
          if (err) {
            return next(err);
          }
          res.status(200).send(cart);
        });
  }

  addCart(req, res, next) {
    const cart = req.body;
    new Cart(cart).save((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(201).send(doc);
    })
  }

  updateCart(req, res, next) {
    const userId = req.body.userId;
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    Cart.update({userId, itemId}, {cartId}, (err, cart) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(201);
    })
  }

  deleteCart(req, res, next) {
    const userId = req.params.userId;
    const cartId = req.params.cartId;
    async.waterfall([
      (done)=> {
        Cart.findOne({userId}, done);
      },
      (carts, done)=> {
        const cart = carts.find(cart => cart.cartId === cartId);
        carts.remove(cart);
        new Cart(cart).save(done);
      }
    ], (err, result)=> {
      if (err) {
        return next(err);
      }
      res.sendStatus(204);
    });
  }

  addItemToCart(req, res, next) {
    const cartId = req.params.cartId;
    const userId = req.params.userId;
    const item = {
      name: req.body.name,
      price: req.body.price,
      count: req.body.count
    };
    async.waterfall([
      (done)=> {
        new Item(item).save(item, done);
      },
      (item, done)=> {
        Cart.findOne({userId}, (err, docs) => {
          if (err) {
            return done(err, null);
          }
          if (docs) {
            let carts = docs.map((cart) => {
              if (cart.cartId === cartId) {
                cart.items.push(item._id);
              }
              return cart;
            });
            docs = carts;
            docs.save(done);
          }
        });
      }
    ], (err, result)=> {
      if (err) {
        return next(err);
      }
      res.status(200).send(result);
    });
  }

  deleteItemFromCart(req, res, next) {
    const userId = req.params.userId;
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;
    async.waterfall([
      (done)=>{
        Cart.findOne({userId},done);
      },
      (docs, done)=>{
       let carts=  docs.map((cart) =>{
          if(cart.cartId === cartId){
            cart.items.remove(itemId);
          }
          return cart;
        });
        new Cart(carts).save(done);
      }
    ],(err, result)=>{
      if(err){
        return next(err);
      }
      res.sendStatus(204);
    })
  }
}

