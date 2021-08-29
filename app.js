const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
var cookieParser = require('cookie-parser')
var cors = require('cors')
require('./Handlers/passport');


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


    //  Express session
    app.use(session({
        secret: 'anything',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 },
    }));

    // Passport.js
    app.use(passport.initialize());
    app.use(passport.session());


    // Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    // Cors
    var allowedOrigins = ['http://127.0.0.1:5500'];
    app.use(cors({ origin: allowedOrigins, credentials: true }))


    app.use((req, res, next) => {
        res.locals.user = req.user || null;
        next();
    });

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