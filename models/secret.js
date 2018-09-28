//Schema Setup
var mongoose = require('mongoose')
var secretSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String,
    yourAadhaar:Number,
    nominee : String,
    nomineeAadhaar : Number,
    nomineeEmail : String,
    author : {
     type : mongoose.Schema.Types.ObjectId,
     ref :'User'
    }
    


})
 
   module.exports= mongoose.model('Secret',secretSchema)