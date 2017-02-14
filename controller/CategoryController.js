import Category  from '../models/category';
import Item   from '../models/item';
var async = require('async');

export default class CategoryController {
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
      return res.status(200).send(result);
    });

  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc)=> {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.status(200).send(doc);
    })
  }

  addCategory(req, res, next) {
    new Category(req.body).save((err, category) => {
      if (err) {
        return next(err);
      }

      res.status(201).send({uri: `categories/${category._id}`});
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
          done(true,   null);
        }else{
          Category.findOneAndRemove({_id:category},(err,result)=>{
            if(!result){
             return done(false, null);
            }
            done(err,result);
          });
        }
      }
    ], (err)=> {
      if( err === true){
        return res.sendStatus(400);
      }
      if(err === false){
        return res.sendStatus(404);
      }
      if(err){
        return next(err);
      }
      return res.sendStatus(204);
    });
  }

  updateCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    const name = req.body.name;
    Category.update({_id:categoryId}, {name}, (err, result) => {
      if (err) {
        return next(err);
      }
      if(!result){
        return res.sendStatus(404);
      }
     return res.sendStatus(204);
    })
  }
}
