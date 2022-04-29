//mongodb
const mongoose=require('mongoose');
const db_link='mongodb+srv://Laukik:uz1dGDfHvjBLGft8@cluster0.rooyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('review connected');
})
.catch(function(err){
    console.log(err);
});

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,'Empty reviews not allowed']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'Rating required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'Object id must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review id must belong to a plan']
    }
})

reviewSchema.pre(/^find/,function(next){
   // console.log('hi');
    this.populate({
        path:"user",
        select:"name profileImage"
    }).populate("plan");
    next();
});

const reviewModel=mongoose.model
('reviewModel',reviewSchema);
module.exports=reviewModel;