var Item = require("../models/item");

export default class ItemController {
  getAll(req, res, next) {
    Item.find({}, (err, items) =>{
      if(err){
        return next(err);
      }
      res.status(200).send(items);
    });
  }

}
