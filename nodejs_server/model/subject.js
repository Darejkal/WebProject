const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    subjectid:{type: String, required:true},
    creatorid:{type: String, required:true},
    uuid:{type: String,unique: true, required:true},
    createdat:{type: Date, required:true},
    report:[{
        userid: {type:String,required:true},
        attended: {type:bool, default:false,required:true}
    }]
});
module.exports=mongoose.models.attendace || mongoose.model('subject', schema);