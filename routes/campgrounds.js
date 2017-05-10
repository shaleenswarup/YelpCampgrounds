var express=require("express");
var router=express.Router();

var Campground=require("../models/campgrounds");
var middleware=require("../middleware");

router.get("/",function(req,res){
  
    Campground.find({},function(err,allCampgrounds){
       if(err){
           console.log(err);
       } 
       else{
           res.render("campgrounds/Index",{campgrounds:allCampgrounds,currentUser:req.user});
       }
    });
    
});

//Add a new campground

router.post("/",middleware.isLoggedIn,function(req,res){
   var name= req.body.name;
   var image=req.body.image;
   var description=req.body.description;
   var author={
       id:req.user._id,
       username:req.user.username
   }
   var price=req.body.price;
   var newcampground={name:name,image:image,description:description,author:author,price:price};
   
   Campground.create(newcampground,function(err,newlyCreatedCamp){
      if(err){
          console.log(err);
      } 
      else{
          res.redirect("/campgrounds");
      }
   });
  
  
});
//Show addition form
router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new.ejs")
});

router.get("/:id",function(req, res) {
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{//Ender the show template with campgroun
              res.render("campgrounds/show",{campgrounds:foundCampground}); 
        }
    });
 
});

//Edit campground Routes
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
   
         Campground.findById(req.params.id,function(err,foundCampground){
              res.render("campgrounds/edit",{campground:foundCampground});
             });
});
// Update Campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id,req.body.campground, function(err,updatedCampground){
       
       if(err){
           res.redirect("campgrounds")
           
       }
       else{
           res.redirect("/campgrounds/"+ req.params.id)
       }
   })
});

//Destroy Campground Route

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
            
        }
    })
    
})




module.exports=router;