//mongodb
const mongoose=require('mongoose');
const db_link='mongodb+srv://Laukik:uz1dGDfHvjBLGft8@cluster0.rooyv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('plan connected');
})
.catch(function(err){
    console.log(err);
});

//schema design for plans

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        uninque:true,
        maxlength:[20,'plan name should be less than 20 chars'] 
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'price not entered']
    },
    ratingsAverage:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        validate:[function(){
            this.discount<100
        },'discount should not be more than 100%']
    },
    NoOfReviews:{
        type:Number,
        default:0
    }
})

//model
const planModel=mongoose.model
('planModel',planSchema);

// (async function createPlan(){
//     let planObj={
//         name:'superfood',
//         duration:30,
//         price:1000,
//         ratingsAverage:5,
//         discount:20
//     }
//     let data=await planModel.create(planObj);
//     console.log(data);
//     //other way to do same;
//         // const doc=new planModel(planObj);
//         // await doc.save();
// })();

module.exports=planModel;