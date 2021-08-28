const express=require('express');
const mongoose=require('mongoose');
require('dotenv/config');
const routes=require('./Routes/index')


const start=async()=>{
    if (!process.env.URI) {
        throw new Error('auth URI must be defined');
    }

    try {
        await mongoose.connect(process.env.URI);
        console.log('Server connected to MongoDb!');
    } catch (err) {
        console.error(err);
    }


    const app=express();
    app.listen(5000, () => {
        console.log(`Server is listening on 5000!!!!!!!!!`);
    });

    // Middleware
    app.use(express.json());
    app.use('/',routes)

     app.get('/',(req,res)=>{
         res.send("welcome to the Twitter");
     })
 
 

};

start();