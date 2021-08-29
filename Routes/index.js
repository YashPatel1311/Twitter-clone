const express = require('express')
let router = express.Router()
const User = require('../Models/User')



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

    userObj = new User({
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        bio: req.body.bio,
        website: req.body.website,
        password: req.body.password
    });


    try {
        await userObj.save();
        req.session.user = JSON.stringify(userObj);
        console.log(req.session);
        res.redirect("http://127.0.0.1:5500/home.html");
    } catch (err) {

        res.redirect("http://127.0.0.1:5500/index.html");
    }

    // User.register(UserObj, req.body.password, function(err, user) {
    //     if (err) {
    //         return res.json({ success: false });
    //     } else {
    //         return res.redirect("http://127.0.0.1:5500/home.html");
    //     }

    // });
});


// Login Logic
router.post('/login', async(req, res) => {

    try {
        const userObj = await User.findOne({ username: req.body.username });

        if (userObj.password === req.body.password) {
            req.session.user = JSON.stringify(userObj);
            console.log(req.session);
            res.redirect("http://127.0.0.1:5500/home.html");
        } else {
            res.redirect("http://127.0.0.1:5500/index.html");
        }
    } catch (err) {
        res.redirect("http://127.0.0.1:5500/index.html");
    }


});





router.post('/logout', async(req, res) => {

    localStorage.setItem('user', {});
    res.redirect("http://127.0.0.1:5500/index.html")

});







// Logic to implement follow functionality
// UserA follows UserB
router.post('/follow', async(req, res) => {

    console.log(req);

    console.log("Body in follow: ");
    console.log(req.body);

    console.log("User in req: ");
    console.log(req.user);

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




function isLoggedIn(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('http://127.0.0.1:5500/index.html');
    }

    return true;

}




module.exports = router;