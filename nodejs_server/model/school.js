const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name:{type: String, required:true},
    abbrev:{type: String, required:true},
    uuid:{type: String,unique: true, required:true},
    createdat:{type: Date, required:true},
});
module.exports=mongoose.models.school || mongoose.model('school', schema);