const express=require('express');
const { update } = require('lodash');
const { protectRoute, isAuthorised } = require('../controller/authController');
const planRouter=express.Router();
//const{protectRoute}=require('../controller/authController')
const{getPlan,getAllPlan,createPlan,
updatePlan,deletePlan,top3Plans}
=require('../controller/planController')
//basic all plans
planRouter.route('/allPlans')
.get(getAllPlan)

//own plan -->logged in  necessary
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

//admin and restaurantowner can only update post and delete plans so this middleware 
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan)
.patch(updatePlan) 
.delete(deletePlan) 

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

planRouter
.route('/top3')
.get(top3Plans)

module.exports=planRouter;