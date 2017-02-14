import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: Number,
  items: [{
    count: Number,
    item: {
      type: Schema.ObjectId,
      ref: 'Item'
    }
  }]
});

export default mongoose.model('Cart', cartSchema);