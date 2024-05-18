const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    uuid:{type: String,unique: true, required:true},
    examid:{type: String, required:true},
    subjectinstanceid:{type: String, required:true},
    createdat:{type: Date, required:true},
});
module.exports= mongoose.models.examinstance || mongoose.model('examinstance', schema);