import Item from "../models/item";
import async from 'async';

export default class ItemController {
  getAll(req, res, next) {
    async.series({
      items: (callback) => {
        Item.find({})
            .populate('category')
            .exec(callback);
      },
      totalCount: (callback) => {
        Item.count(callback);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send(result);
    });
  }

  getOne(req, res, next) {
    Item.findById(req.params.itemId)
        .populate('category')
        .exec((err, doc)=> {
          if (err) {
            return next(err);
          }
          if (!doc) {
            return res.sendStatus(404);
          }
          return res.status(200).send(doc);

        });
  }

  addItem(req, res, next) {
    new Item(req.body).save((err, item)=> {
      if (err) {
        return next(err);
      }
      res.status(201).send({uri: `items/${item._id}`});
    })
  }

  deleteItem(req, res, next) {
    Item.findOneAndRemove({_id: req.params.itemId}, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(404);
      }
      return res.status(204);
    })
  }

  updateItem(req, res, next) {
    const itemId = req.params.itemId;
    const price = req.body.price;
    Item.update({_id: itemId}, {$set: {price}}, (err, item)=> {
      if (err) {
        return next(err);
      }
      if (!item) {
        return res.sendStatus(404);
      }
      return res.sendStatus(204);
    })
  }
}
