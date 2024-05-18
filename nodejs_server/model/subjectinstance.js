const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    subjectid: { type: String, required: true },
    name:{type: String, required:true},
    uuid:{type: String,unique: true, required:true},
    createdat:{type: Date, required:true},
});
module.exports= mongoose.models.subjectinstance || mongoose.model('subjectinstance', schema);