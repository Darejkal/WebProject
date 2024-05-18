import { bool, string } from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;
interface IAttendance{
    subjectid:String,
    creatorid:String,
    uuid:String,
    createdat:Date,
    report:[{
        userid:String,
        attended: Boolean
    }]
}
export const Attendance:mongoose.Model<IAttendance> =(()=> {
    const schema = new Schema({
        subjectinstanceid:{type: String, required:true},
        creatorid:{type: String, required:true},
        uuid:{type: String,unique: true, required:true},
        createdat:{type: Date, required:true},
        report:[{
            userid: {type:String,required:true},
            attended: {type: Boolean, default:false,required:true}
        }]
    });
    return mongoose.models.attendace || mongoose.model<IAttendance>('subject', schema);
})()

