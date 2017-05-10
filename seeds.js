var mongoose=require("mongoose");
var Campground=require("./models/campgrounds");
var Comment=require("./models/comments");
var data=[
    {
        name:"Clouds Rest",
        image:"https://farm2.staticflickr.com/1203/1132895352_afd086a60b.jpg",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
        {
        name:"Forest Clouds",
        image:"https://static1.squarespace.com/static/55e8faf7e4b0b79bc08930af/t/55eb3600e4b0852e6b00e3a9/1441478146030/10961.jpg?format=1500w",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
        {
        name:"Canyon Floor",
        image:"https://farm5.staticflickr.com/4016/4270995674_9fd4546267.jpg",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
    
    
    
    ];


function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({},function(err){
//     if(err){
//         console.log(err);
//     }
//     console.log("removed campgrounds!");
//     //ADD A NEW CAMPGROUNDS
//       data.forEach(function(seed){
//       Campground.create(seed,function(err,campground){
//          if(err){
//              console.log(err);
//          }  
//          else{
//              console.log("campground added");
//              //create a comment
//              Comment.create({
//                  text:"The place is great,but I wish there was internet",
//                  author:"Homer"
//              },function (err,comment) {
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     campground.comments.push(comment);
//                     campground.save();
//                     console.log("Created new comment");
//                 }
//              });
//          }
//       }) 
//     });
// });


  
});
}

module.exports=seedDB;