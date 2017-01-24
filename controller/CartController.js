import Cart from '../models/cart';

export default class CartController{
  addCart(req, res, next){
    const cart = req.body;
    new Cart(cart).save((err,doc) =>{
      if(err){
        return next(err);
      }
      res.status(201).send(doc);
    })
  }
}