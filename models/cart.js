import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: Number,
  cartId:Number,
  items: [{
    type:Schema.Types.ObjectId,
    ref:'Item'
  }]
});

export default mongoose.model('Cart',cartSchema);