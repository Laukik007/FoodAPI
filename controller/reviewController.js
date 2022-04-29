const reviewModel=require('../model/reviewModel')
const planModel=require('../model/planModel')
module.exports.getAllreviews=async function getAllreviews(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            return  res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:'reviews not found'
            })
        } 
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}
module.exports.top3reviews=async function top3reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({
            rating:-1
        }).limit(3);
        if(reviews){
            return  res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:'reviews not found'
            })
        } 
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.getPlanreviews=async function getPlanreviews(req,res){
    try{
        let planid=req.params.id;
        let reviews=await reviewModel.find();
        reviews=reviews.filter(review => review.plan._id==planid)
        return res.json({
            message:"reviews retrivewed for a particular plan",
            data:reviews
        })
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
}

module.exports.createReview=async function createReview(req,res){
    try{
        let id=req.params.plan;
        let plan=await planModel.findById(id);
        let review=await reviewModel.create(req.body);
        //console.log(plan);
        plan.NoOfReviews=plan.NoOfReviews+1;
        plan.ratingsAverage=(plan.ratingsAverage+req.body.rating)/plan.NoOfReviews;
        await plan.save();
        console.log(plan);
        res.json({
            message:'review created successfully',
            data:review
        });
    }
    catch(err){
        return res.json({
            message:err.message
        });
    }
}

module.exports.updateReview=async function updateReview(req,res){
   try{
        let planid=req.params.id;
        let id=req.body.id;
        let dataToBeUpdated=req.body;
        let keys=[];
        for(let key in dataToBeUpdated){
            if(key=='id')continue
            keys.push(key);
        }
        console.log(keys);
        console.log(id);
        let review=await reviewModel.findById(id);
        console.log(review);
        for(let i=0; i<keys.length; i++){
            review[keys[i]]=dataToBeUpdated[keys[i]];
        }
        console.log(review);
        res.json({
            message:'Plan updated successfully',
            data:review
        })
        await review.save();
   }
   catch(err){
       return res.json({
           message:err.message
       })
   }
}


module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let planid=req.params.id;
        let id=req.body.id;
        let deletedReview=await reviewModel.findByIdAndDelete(id);
        return res.json({
            message:'plan deleted successfully',
            data:deletedReview
        })
    }
    catch(err){
        res.staus(500).json({
            message:err.message
        })
    }
}
