import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var itemSchema = new Schema({
  name:String,
  price:Number,
  count:Number,
  CategoryId:{
    type:Number,
    ref:'Category'
  }
});

module.exports = mongoose.model('Item',itemSchema);

