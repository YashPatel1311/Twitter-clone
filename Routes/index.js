const express = require('express')
let router = express.Router()
const User = require('../Models/User')
const passport = require('passport')

// Helper function to implement unfollow
Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

// Register Logic
router.post('/register', async function(req, res) {

    console.log(req);

    UserObj = new User({
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        bio: req.body.bio,
        website: req.body.website
    });

    console.log(req.body);


    User.register(UserObj, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.json({ success: false });
        } else {
            return res.json({ success: true });
        }

        // const { user } = await DefaultUser.authenticate()('user', 'password');

        //   User.register(UserObj, req.body.password, function(err, user) {
        //     if (err) {
        //       res.json({success:false, message:"Your account could not be saved. Error: ", err}) 
        //     }else{
        //       res.json({success: true, message: "Your account has been saved"})
        //     }
    });
});


// Login Logic
router.post('/login',
    passport.authenticate('local', {
        successRedirect: 'http://127.0.0.1:5500/home.html',
        failureRedirect: 'http://127.0.0.1:5500/index.html'
    })
);


// Logic to implement follow functionality
// UserA follows UserB
router.post('/follow', async(req, res) => {

    console.log(req.session);

    let userA = req.user;

    try {
        let userB = await User.findOne({ username: req.body.username });
        userA.following.push(userB.username);
        User.updateOne({ _id: userA._id }, { following: userA.following });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: "User not found. Error: ", err });
    }

});


// Unfollow Logic
router.post('/unfollow', async(req, res) => {
    let userA = req.user;

    try {
        let userB = await User.findOne({ username: req.body.username });
        userA.following.remove(userB.username);
        User.updateOne({ _id: userA._id }, { following: userA.following });
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, message: "You are not following the user. Error: ", err });
    }

});




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("http://127.0.0.1:5500/index.html");
}



module.exports = router;