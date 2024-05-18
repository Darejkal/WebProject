const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    uuid:{type: String,unique: true, required:true},
    question:{type: String, required:true},
    options:[
        {
            uuid:{type:String},
            text:{type:String},
            score:{type:Number,default:0}
        }
    ],
    createdat:{type: Date, required:true},
    category:{type: String, default:"normal"},
});
module.exports=mongoose.models.User|| mongoose.model("question",UserSchema)