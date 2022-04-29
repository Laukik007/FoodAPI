const express=require('express');

const paymentRouter=express.Router();
const {protectRoute}=require('../controller/authController');
const {createSession}=require('../controller/paymentController');

paymentRouter.post('/createSession',protectRoute);
paymentRouter.get('/createSession',function(req,res){
    res.sendFile('C:/Users/Laukik/OneDrive/Desktop/foodapp/payment.html')
})

module.exports=paymentRouter;