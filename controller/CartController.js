import Cart from '../models/cart';

export default class CartController{
  getAll(req, res, next){
    Cart.find({}, (err,carts)=>{
      if(err){
        return next(err);
      }
      res.status(200).send(carts);
    })
  }

  addCart(req, res, next){
    const cart = req.body;
    new Cart(cart).save((err,doc) =>{
      if(err){
        return next(err);
      }
      res.status(201).send(doc);
    })
  }

  updateCart(req, res, next){
    const cartId = req.params.cartId;
    const userId = req.body.userId;
    Cart.update({cartId}, {userId},(err,cart) =>{
      if(err){
        return next(err);
      }
      res.sendStatus(201);
    })
  }

  deleteCart(req, res, next){
    const cartId= req.params.cartId;
    Cart.remove({cartId},(err, result)=>{
      if(err){
        return next(err);
      }
      res.sendStatus(204);
    })
  }
}
