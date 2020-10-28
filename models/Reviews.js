const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const reviewSchema= new Schema({
    user: {ObjectId},
    reviewTitle: String,
    comment: String,
    commentTo: {ObjectId}
});

  
reviewSchema.set('timestamps', true);
  
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
