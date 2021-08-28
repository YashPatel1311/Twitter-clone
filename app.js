const express=require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('dotenv/config');
const routes=require('./Routes/index')

const User=require('./Models/User')

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


    app.use(session({ secret: process.env.SECRET, resave: true,
        saveUninitialized: true }));

    // Passport.js
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    const LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(User.authenticate()));


    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/',routes)

     app.get('/',(req,res)=>{
         res.send("welcome to the Twitter");
     })
 
 

};

start();