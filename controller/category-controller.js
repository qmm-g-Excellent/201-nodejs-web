const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      categories: (callback) => {
        Category.find({}, callback);
      },
      totalCount: (callback)=> {
        Category.count(callback);
      }
    }, (err, result)=> {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });

  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.status(constant.httpCode.OK).send(doc);
    })
  }

  addCategory(req, res, next) {
    new Category(req.body).save((err, category) => {
      if (err) {
        return next(err);
      }

      res.status(constant.httpCode.CREATED).send({uri: `categories/${category._id}`});
    })
  }

  deleteCategory(req, res, next) {
    const category = req.params.category;
    async.waterfall([
      (done)=> {
        Item.findOne({category}, done);
      },
      (item, done)=> {
        if (item) {
          done(true, null);
        } else {
          Category.findOneAndRemove({_id: category}, (err, result)=> {
            if (!result) {
              return done(false, null);
            }
            done(err, result);
          });
        }
      }
    ], (err)=> {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }
      if (err === false) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  updateCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    const name = req.body.name;
    Category.update({_id: categoryId}, {name}, (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }
}

module.exports = CategoryController;