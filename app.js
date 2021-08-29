const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
var cors = require('cors')


require('dotenv/config');
const routes = require('./Routes/index')

const User = require('./Models/User')

const start = async() => {
    if (!process.env.URI) {
        throw new Error('auth URI must be defined');
    }

    try {
        await mongoose.connect(process.env.URI);
        console.log('Server connected to MongoDb!');
    } catch (err) {
        console.error(err);
    }


    const app = express();

    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: 'anything',
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }));




    // Passport.js
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    const LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(User.authenticate()));

    // Cors
    var allowedOrigins = ['http://127.0.0.1:5500'];

    app.use(cors({ origin: allowedOrigins, credentials: true }))


    // Routes
    app.use('/', routes)

    app.get('/', (req, res) => {
        res.send("welcome to the Twitter");
    })



    app.listen(5000, () => {
        console.log(`Server is listening on 5000!!!!!!!!!`);
    });


};

start();