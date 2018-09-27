var mongoose = require('mongoose')

var requestSchema =new mongoose.Schema({
    yourAadhaar : Number,
    yourEmail : String,
    deceasedAdhaar :Number,
    deathCertificate : String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        username: String
    }
})

module.exports = mongoose.model('Request',requestSchema) 