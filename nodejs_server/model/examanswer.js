const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    uuid:{type: String,unique: true, required:true},
    userid:{type: String, required:true},
    examinstanceid:{type: String, required:true},
    createdat:{type: Date, required:true},
    choices:[{
        questionid:{type: String, required:true},
        optionid:{type: String,default:null}
    }]
});
module.exports= mongoose.models.examanswer || mongoose.model('examanswer', schema);