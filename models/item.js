import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name:String,
  price:Number,
  count:Number
});

export default mongoose.model('Item',ItemSchema);

