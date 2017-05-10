var mongoose=require("mongoose");


var commentSchema=new mongoose.Schema({
    text:String,
    author:{
        username:String,
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
});

module.exports=mongoose.model("Comment",commentSchema);