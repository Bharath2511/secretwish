var express = require('express'),
    router = express.Router({mergeParams:true}),
    passport = require('passport'),
    User = require('../models/user'),
    Secret = require('../models/secret')
    Request = require('../models/request')


router.get("/", function(req, res){
    res.render("homepage");
})

//Auth routes
//show register form
router.get('/register',(req,res)=>{
    res.render('register')
 })
 
router.post('/register',(req,res)=>{
     var newUser = new User({
        username:req.body.username,
        email  : req.body.email, 
        avatar : req.body.avatar,
        
 })
     if(req.body.adminCode === "wakandaforever") {
         newUser.isAdmin = true;
     }
     User.register(newUser,req.body.password,(err,user)=>{
         if(err){
             console.log(err)
             res.render('./register')
         }
         passport.authenticate('local')(req,res,function(){
             res.redirect('/secrets')
         })
     })
 })
 
 //login 
 
 router.get('/login',passport.authenticate('local'),
//  {
//      successRedirect:'/secrets',
//      failureRedirect:'/login'
//  }),
 (req,res)=>{
     res.json(req.user)
     console.log("$$$$$$$$$$$$$$$$", req.user)
 })
 
 //logout
 router.get('/logout',(req,res)=>{
     req.logout()
     req.flash('success','Logged you out')
     res.redirect('/secrets')
 })
 
 //user profile
router.get('/users/:id',(req,res)=>{
    User.findById(req.params.id,(err,foundUser)=>{
        if(err) {
            req.flash('error','something went wrong')
            res.redirect('/')
        }
        Secret.find().where('author.id').equals(foundUser._id).exec(function(err,secrets) {
            if(err) {
                req.flash('error','something went wrong')
                res.redirect('/')
            }
        
        res.render('users/show',{user:foundUser,secrets:secrets})
        })
    })
})


 function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
         return next()
     }
     res.redirect('/login')
 }

 module.exports = router