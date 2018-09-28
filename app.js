require('dotenv').config()
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require('connect-flash')
    Secret      = require("./models/secret"),
    seedDB      = require("./seeds"),
    Request     = require('./models/request')
    passport    = require('passport')
    LocalStrategy = require('passport-local')
    User        = require('./models/user'),
    methodOverride = require('method-override')
    

var requestRoutes = require('./routes/requests'),
    secretRoutes = require('./routes/secrets'),
    indexRoutes = require('./routes/index')

// const url = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@ds117423.mlab.com:17423/deathwish
const url = "mongodb://"+process.env.DATABASE_USER+":"+process.env.DATABASE_PASS+"@ds117423.mlab.com:17423/deathwish"

mongoose.connect(url).catch((err) => {console.log(err)})
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(flash())
app.set("view engine", "ejs");
app.use(express.static(__dirname+'/public'))
//seedDB()
console.log(process.env.DATABASE_USER)
var requestRoutes = require('./routes/requests'),
    secretRoutes = require('./routes/secrets'),
    indexRoutes = require('./routes/index')


//passport config
app.use(require('express-session')({
  secret : "Banana",
  resave : false,
  saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
} )

app.use('/',indexRoutes)
app.use('/secrets',secretRoutes)
app.use('/requests',requestRoutes)


app.listen(8886,()=>{
    console.log(8886)
})