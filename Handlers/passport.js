const passport = require('passport');
const User = require('../Models/User');

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    console.log(user.username);
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    console.log("In deserializeUser:" + username);
    User.findOne({ username: username }, function(err, user) {
        console.log(user);
        done(err, user);
    });
});