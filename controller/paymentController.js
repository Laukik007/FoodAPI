let SK="sk_test_51KYnUdSHHUNvlfDpkL3sDZ9EpWt5QjWBU2pjfHw53LuEUlLSYONK71utncVMONCI5iPxyN5lWPerCcI9mlttfTux00Govuu5Ak";
const stripe=require('stripe')(SK);
const res = require('express/lib/response');
const planModel=require('../model/planModel');
const userModel=require('../model/userModel');

module.exports.createSession=async function(){
    try{
        let userId=req.id;
        let planId=req.params.id;
        
        const user=await userModel.findById(userId);
        const plan=await planModel.findById(planId);

        const session=await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email:user.email,
            client_reference_id:planId,
            line_items:[
                {
                name:plan.name,
                description:plan.description,
                amount:plan.price*100,
                currency:"inr",
                quantity:1
                }
            ],
            success_url:`${req.protocol}://${req.get("host")}/profile`,
            cancel_url:`${req.protocol}://${req.get("host")}/profile`
        })
        res.status(200).json({
            status:"success",
            session
        })
    }
    catch(err){
        res.status(200).json({
            err:err.message
        })
    }
}