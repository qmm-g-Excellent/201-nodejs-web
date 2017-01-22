var Item = require("../models/item");

export default class ItemController {
  getAll(req, res, next) {
    Item.find({}, (err, items) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(items);
    });
  }

  getItem(req, res, next) {
    Item.findById({_id: req.params.id}, (err, item) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(item);
    })
  }

  insertItem(req, res, next) {
    new Item(req.body).save((err, item)=> {
      if (err) {
        return next(err);
      }
      res.status(201).send(item);
    })
  }
}
