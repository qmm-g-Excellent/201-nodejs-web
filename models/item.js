import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name:String,
  price:Number,
  category:{
    type:Schema.ObjectId,
    ref: 'Category'
  }
});

export default mongoose.model('Item',itemSchema);

