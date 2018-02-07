var express=require("express");
var app=express();
var request=require("request");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Campground=require("./models/campgrounds");
var seedDB=require("./seeds");
var Comment=require("./models/comments");
var passport=require("passport");
var LocalStrategy= require("passport-local");
var User=require("./models/user");
var methodOverride=require("method-override");
var flash= require("connect-flash");
//requiring routes
var  commentRoutes=require("./routes/comments");
var  campgroundRoutes=require("./routes/campgrounds");
var  indexRoutes=require("./routes/index");
console.log(process.env.DATABASEURL);
mongoose.connect("mongodb://shaleen:swarup@ds137291.mlab.com:37291/yelpcamp");
// var url=process.env.DATABASEURL||"mongodb://localhost/yelp_camp";
// mongoose.connect(url);
// "mongodb://shaleen:swarup@ds137291.mlab.com:37291/yelpcamp"



    
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

//PASSPORT CONFIGURATION


app.use(require("express-session")({
    
    secret:"Once again Rusty wins",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("error"); 
   res.locals.success=req.flash("success");
   next();
});

//   var campgrounds=[{name:"Salmon Creek",image:"https://static1.squarespace.com/static/55e8faf7e4b0b79bc08930af/t/55eb3600e4b0852e6b00e3a9/1441478146030/10961.jpg?format=1500w"},
//     {name:"Nainital",image:"https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg"},
//     {name:"Ooty",image:"https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},{name:"Salmon Creek",image:"https://static1.squarespace.com/static/55e8faf7e4b0b79bc08930af/t/55eb3600e4b0852e6b00e3a9/1441478146030/10961.jpg?format=1500w"},
//     {name:"Nainital",image:"https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg"},
//     {name:"Ooty",image:"https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"},{name:"Salmon Creek",image:"https://static1.squarespace.com/static/55e8faf7e4b0b79bc08930af/t/55eb3600e4b0852e6b00e3a9/1441478146030/10961.jpg?format=1500w"},
//     {name:"Nainital",image:"https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg"},
//     {name:"Ooty",image:"https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg"}];

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/",indexRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    
    console.log("Yelpcamp server has started");
    
});