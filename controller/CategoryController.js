import Category  from '../models/category';
import Item   from '../models/item';
var async = require('async');

export default class CategoryController {
  getAll(req, res, next) {
    Category.find({}, (err, categories) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(categories);
    })
  }

  getCategory(req, res, next) {
    Category.findOne({categoryId: req.params.categoryId})
        .populate('items')
        .exec((err, doc)=> {
          if (err) {
            return next(err);
          }
          res.status(200).send(doc);
        });
  }

  insertCategory(req, res, next) {
    new Category(req.body).save((err, category) => {
      if (err) {
        return next(err);
      }

      res.status(201).send(category);
    })
  }

  deleteCategory(req, res, next) {
    Category.remove({categoryId: req.params.categoryId}, (err, result)=> {
      if (err) {
        return next(err);
      }
      res.status(201).send(result);
    })
  }

  updateCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    const categoryName = req.body.categoryName;
    Category.update({categoryId}, {categoryName}, (err, category) => {
      if (err) {
        return next(err);
      }
      res.status(204).send(category);
    })
  }

  addExitedItemToCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    const itemId = req.params.itemId;
    Category.findOne({categoryId}, (err, category)=> {
      Category.findOne({'items': itemId}, (err, doc) => {
        if (err) {
          return next(err);
        }
        if (!doc) {
          category.items.push(itemId);
          category.save();
          return res.status(201).send(category);
        }
        res.sendStatus(204);
      })
    })
  }

  addItemToCategory(req, res, next) {
    let categoryId = req.params.categoryId;
    let item = {
      name: req.body.name,
      price: req.body.price,
      count: req.body.count
    };
    async.waterfall([
      (done)=> {
        new Item(item).save((err, item) => {
          done(err, item);
        });
      },
      (item, done)=> {
        Category.findOne({categoryId}, (err, category)=> {
          if (category) {
            category.items.push(item._id);
            category.save(done);
          }
        });
      }
    ], (err, result)=> {
      if (err) {
        return next(err);
      }
      if (result) {
        return res.status(201).send(result);
      }
      res.sendStatus(404);
    });
  }

  updateItemForCategory(req, res, next) {
    const itemId = req.params.itemId;
    const categoryId = req.params.categoryId;
    const price = req.body.price;
    Item.update({_id: itemId}, {price}, (err, item)=> {
      Category.findOne({categoryId, 'items': itemId})
          .populate('items')
          .exec((err, item) => {
            if (err) {
              return next(err);
            }
            res.status(201).send(item);
          })
    });
  }

  deleteItemForCategory(req, res, next) {
    const itemId = req.params.itemId;
    const categoryId = req.params.categoryId;
    Category.findOne({categoryId}, (err, category)=> {
      if(err){
        return next(err)
      }
      category.items.remove(itemId);
      category.save((err, doc) =>{
        res.sendStatus(204);
      });
    })
  }

}
