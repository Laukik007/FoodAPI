const express=require('express');
const { protectRoute, isAuthorised } = require('../controller/authController');
const reviewRouter=express.Router();
//const{protectRoute}=require('../controller/authController')
const{getPlanreviews,getAllreviews,createReview,
updateReview,deleteReview,top3reviews}
=require('../controller/reviewController');
//basic all reviews
reviewRouter
.route('/allreviews')
.get(getAllreviews);

//top3Reviews
reviewRouter
.route('/top3')
.get(top3reviews);

//specific reviews
reviewRouter
.route('/:id')
.get(getPlanreviews);


//create reviews
reviewRouter.use(protectRoute)
reviewRouter
.route('/crud/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview)

module.exports=reviewRouter;