const mongoose = require("mongoose");
const ExamSchema = new mongoose.Schema(
    {
        name:{type: String, required:true},
        createdat:{type: Date, required:true},
        questions:[
            {
                type: String
            }
        ],
        category:{type: String, default:"normal"},
    },
    {
        timestamps:true
    }
);



module.exports=mongoose.models.User|| mongoose.model("exam",ExamSchema)