const express=require('express')
let router=express.Router()
const User=require('../Models/User')
const passport= require('passport')

router.post('/register',async function(req, res) {
      
    UserObj=new User({
        email: req.body.email, 
        username : req.body.username,
        name: req.body.name,
        bio: req.body.bio,
        website: req.body.website
    });

    User.register(UserObj, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.json({success:false});
        }
        else{
            return res.json({success:true});
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


router.get('success',(req,res)=>{
    res.json({loginSuccess:true});
})


router.post('/login',
  passport.authenticate('local', { successRedirect: '/success',
                                   failureRedirect: '/login'})
);

module.exports=router;