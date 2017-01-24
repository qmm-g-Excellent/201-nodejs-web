import mongoose from 'mongoose';
let Schema = mongoose.Schema;


const CategorySchema = new Schema({
  categoryId: Number,
  categoryName: String,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
});

export  default mongoose.model('Category', CategorySchema);