const express=require('express'); //requiring express
//const { nextTick } = require('process');

const app=express();  //invoking express with name = app
const cookieParser=require('cookie-parser');
//middleware
app.use(express.json());
app.listen(3000);
app.use(cookieParser());

const userRouter=require('./Routers/userRouter');
const planRouter=require('./Routers/planRouter');
const reviewRouter=require('./Routers/reviewRouter')
const paymentRouter=require('./Routers/paymentRouter');
//const authRouter=require('./Routers/authRouter');
//base route
app.use('/user',userRouter);
app.use('/plans',planRouter);
app.use('/review',reviewRouter)
app.use('/payment',paymentRouter);