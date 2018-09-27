var express = require("express");
var router  = express.Router({mergeParams:true});
var Secret = require("../models/secret");
var Request = require('../models/request')
var middleware = require("../middleware");
var multer = require('multer');

//INDEX - show all secret requests to admin
router.get("/", function(req, res){
    // Get all secrets from DB
    Request.find({}, function(err, allRequests){
       if(err){
           console.log(err);
       } else {
          res.render("requests/index",{requests:allRequests});
       }
    });
});

//CREATE - add new secret to DB
 router.post('/',middleware.isLoggedIn,(req,res)=>{
     var yourAadhaar = req.body.youraadhaar;
      var yourEmail = req.body.youremail;
      var deceasedAdhaar = req.body.deceasedadhaar;
      var deathCertificate = req.body.deathcertificate;
      var author = {
          id : req.user._id,
          username : req.user.username 
     }
     
      var newRequest = {yourAadhaar: yourAadhaar, yourEmail: yourEmail, deceasedAdhaar: deceasedAdhaar,yourAadhaar:yourAadhaar,deathCertificate:deathCertificate,author:author}
    //save data to db
    Request.create(newRequest,(err,newlyCreatedRequest)=>{
        if(err) {
            console.log(err)
        }
        else {
            //redirect to secret page
            res.redirect('/requests')
        }
    })
})


//NEW - show form to create new secret
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("requests/new"); 
});

// SHOW - shows more info about one secret
router.get("/:id",middleware.isLoggedIn, function(req, res){
    //find the secret with provided ID
    Request.findById(req.params.id,function(err, foundRequest){
        if(err){
            console.log(err);
        } else {
            console.log(foundRequest)
            //render show template with that secret
            res.render("requests/show", {request: foundRequest});
        }
    });
});

// EDIT secret ROUTE
router.get("/:id/edit", middleware.checkRequestOwnership, function(req, res){
    Request.findById(req.params.id, function(err, foundRequest){
        res.render("secrets/edit", {request: foundRequest});
    });
});

// UPDATE secret ROUTE
router.put('/:id',middleware.checkSecretOwnership,(req,res)=>{
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
           res.redirect('/requests')
       }
       else {
          res.redirect('/requests')
       }
   })
})

module.exports = router;

