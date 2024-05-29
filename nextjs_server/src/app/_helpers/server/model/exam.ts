import { bool, number } from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const Exam =(()=> {
    const schema = new Schema({
        uuid:{type: String,unique: true, required:true},
        name:{type: String, required:true},
        createdat:{type: Date, required:true},
        questionids:[
            {
                type: String
            }
        ],
        category:{type: String, default:"normal"},
    });
    return mongoose.models.exam || mongoose.model('exam', schema);
})()
export const Question =(()=> {
    const schema = new Schema({
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
    return mongoose.models.question || mongoose.model('question', schema);
})()
export const ExamInstance =(()=> {
    const schema = new Schema({
        uuid:{type: String,unique: true, required:true},
        examid:{type: String, required:true},
        subjectinstanceid:{type: String, required:true},
        createdat:{type: Date, required:true},
    });
    return mongoose.models.examinstance || mongoose.model('examinstance', schema);
})()
export const ExamAnswer =(()=> {
    const schema = new Schema({
        uuid:{type: String,unique: true, required:true},
        userid:{type: String, required:true},
        examinstanceid:{type: String, required:true},
        createdat:{type: Date, required:true},
        choices:[{
            questionid:{type: String, required:true},
            optionid:{type: String,default:null}
        }]
    });
    return mongoose.models.examanswer || mongoose.model('examanswer', schema);
})()

