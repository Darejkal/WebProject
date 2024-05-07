import { bool } from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;
export const Attendance =(()=> {
    const schema = new Schema({
        subjectid:{type: String, required:true},
        creatorid:{type: String, required:true},
        uuid:{type: String,unique: true, required:true},
        createdat:{type: Date, required:true},
        report:[{
            userid: {type:String,required:true},
            attended: {type:bool, default:false,required:true}
        }]
    });
    return mongoose.models.attendace || mongoose.model('subject', schema);
})()

