var express = require("express");
var router  = express.Router({mergeParams:true});
var Secret = require("../models/secret");
var Request = require('../models/request')
var middleware = require("../middleware");
var multer = require('multer');

//INDEX - show all secret requests to admin
router.get("/", function(req, res){
    // Get all secrets from DB
    
    Secret.find({}, function(err, allSecrets){
       if(err){
           console.log(err);
       } else {

          res.render("secrets/index",{secrets:allSecrets});
       }
    });
});

//CREATE - add new secret to DB
 router.post('/',/*middleware.isLoggedIn,*/(req,res)=>{
     var name = req.body.name;
      var image = req.body.image;
      var description = req.body.description;
      var yourAadhaar = req.body.youraadhaar;
      var nominee = req.body.nominee
      var nomineeAadhaar = req.body.nomineeaadhaar
      var NomineeEmail = req.body.nomineeemail 
    //   var author = {
    //       id : req.user._id,
    //       username : req.user.username 
    //  }
     
      var newSecret = {name: name, image: image, description: description,yourAadhaar:yourAadhaar,nominee:nominee,nomineeAadhaar:nomineeAadhaar,NomineeEmail:NomineeEmail,/*author:author*/}
    //save data to db
    Secret.create(newSecret,(err,newlyCreatedSecret)=>{
        if(err) {
            console.log(err)
        }
        else {
            //redirect to secret page
            res.redirect('/secrets')
        }
    })
})


//NEW - show form to create new secret
router.get("/new", /*middleware.isLoggedIn*/ function(req, res){
   res.render("secrets/new"); 
});

// SHOW - shows more info about one secret
router.get("/:id",/*middleware.isLoggedIn,*/ function(req, res){
    //find the secret with provided ID
    Secret.findById(req.params.id,function(err, foundSecret){
        if(err){
            console.log(err);
        } else {
            console.log(foundSecret)
            //render show template with that secret
            res.json(foundSecret);
        }
    });
});

// EDIT secret ROUTE
router.get("/:id/edit", middleware.checkSecretOwnership, function(req, res){
    Secret.findById(req.params.id, function(err, foundSecret){
        res.render("secrets/edit", {secret: foundSecret});
    });
});

// UPDATE secret ROUTE
router.put('/:id',middleware.checkSecretOwnership,(req,res)=>{
    Secret.findByIdAndUpdate(req.params.id,req.body.secret,(err,updatedSecret)=>{
        if(err) {
            res.redirect('/secrets')
        }
        else {
            res.json(updatedSecret)
        }
    })
}) 
// DESTROY secret ROUTE
router.delete('/:id',middleware.checkSecretOwnership,(req,res)=>{
    Secret.findByIdAndRemove(req.params.id,(err)=>{
       if(err) {
           res.redirect('/secrets')
       }
       else {
          res.redirect('/secrets')
       }
   })
})

//INDEX - show all  requests to admin
router.get("/", function(req, res){
    // Get all secrets from DB
    Request.findById({}, function(err, allRequests){
       if(err){
           console.log(err);
       } else {
          res.render("secret/index",{requests:allRequests});
       }
    });
});

//CREATE - add new request to DB
 router.post('/',/*middleware.isLoggedIn*/(req,res)=>{
     var yourAadhaar = req.body.youraadhaar;
      var yourEmail = req.body.youremail;
      var deceasedAdhaar = req.body.deceasedadhaar;
      var deathCertificate = req.body.deathcertificate
      
      var author = {
          id : req.user._id,
          username : req.user.username 
     }
     
      var newRequest = {yourAadhaar:yourAadhaar, yourEmail: yourEmail, deceasedAdhaar: deceasedAdhaar,deathCertificate:deathCertificate,author:author}
    //save data to db
    Request.create(newRequest,(err,newlyCreatedRequest)=>{
        if(err) {
            console.log(err)
        }
        else {
            //redirect to secret page
            res.redirect('/secrets')
        }
    })
})


//NEW - show form to create new secret
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("secrets/rnew"); 
});

// SHOW - shows more info about one request
router.get("/:id",middleware.isLoggedIn, function(req, res){
    //find the request with provided ID
    Request.findById(req.params.id,function(err, foundRequest){
        if(err){
            console.log(err);
        } else {
            console.log(foundRequest)
            //render show template with that secret
            res.render("secrets/rshow", {request: foundRequest});
        }
    });
});

// EDIT request ROUTE
router.get("/:id/edit", middleware.checkRequestOwnership, function(req, res){
    Request.findById(req.params.id, function(err, foundRequest){
        res.render("secrets/redit", {request: foundRequest});
    });
});

// UPDATE request ROUTE
router.put('/:id',middleware.checkRequestOwnership,(req,res)=>{
    Request.findByIdAndUpdate(req.params.id,req.body.request,(err,updatedRequest)=>{
        if(err) {
            res.redirect('/requests')
        }
        else {
            res.redirect('/requests/'+req.params.id)
        }
    })
}) 
// DESTROY secret ROUTE
router.delete('/:id',middleware.checkRequestOwnership,(req,res)=>{
    Request.findByIdAndRemove(req.params.id,(err)=>{
       if(err) {
           res.redirect('/secrets')
       }
       else {
          res.redirect('/secrets')
       }
   })
})




module.exports = router;

