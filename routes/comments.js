var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campgrounds");
var Comment=require("../models/comments");
var middleware=require("../middleware");

//comments new
router.get("/new",middleware.isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        
    }
    else{
    
  res.render("comments/new",{campground:campground}); 
    }
});

});
//comments create
router.post("/",middleware.isLoggedIn,function(req,res){
    //lookup campground using id
   
    Campground.findById(req.params.id,function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            console.log(req.body.comment);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                    req.flash("error","Something went wrong");
                }
                else{
                    //add username and id to comment
                   console.log("New comment's username will be : "+req.user.username) ;
                   console.log(comment);
                   comment.author.id=req.user._id;
                   comment.author.username=req.user.username;
                   comment.save();
                    campground.comments.push(comment);
                    campground.save();
                     req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                    
                    
                }
                
            });
        }
    });
     //create new comment
    //connect new comment to campground
    //redirect campground show page
    });
   //comments edit route 
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err){
            res.redirect("back");
        }
        else{
         res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
        
    })

    
})
    //comments Update route
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComeents){
       if(err){
           res.redirect("back")
       }
       else{
           res.redirect("/campgrounds/"+ req.params.id);
       }
   })
});  
    
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
        Comment.findByIdAndRemove(req.params.comment_id,function(err){
            if(err){
                res.redirect("back");
            }
            else{
                 req.flash("success","Comment deleted");
                res.redirect("/campgrounds/"+req.params.id);
            }
        });
    });
    
    
 

module.exports=router;