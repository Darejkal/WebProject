import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const Subject =(() =>{
    const schema = new Schema({
        name: { type: String, required: true },
        abbrev: { type: String, required: true },
        createdat:{type: Date, required:true},
        uuid:{type: String,unique: true, required:true},
        schoolid:{type: String}
    });
    return mongoose.models.subject || mongoose.model('subject', schema);
})()
export const SubjectInstance=(()=>{
    const schema = new Schema({
        subjectid: { type: String, required: true },
        uuid:{type: String,unique: true, required:true},
        createdat:{type: Date, required:true},
    });
    return mongoose.models.subjectinstance || mongoose.model('subjectinstance', schema);
})()
export const UserSubjectInstanceRelation=(()=>{
    const schema = new Schema({
        userid:{ type: String, required: true },
        subjectid: { type: String, required: true },
        role: { type: String, required: true,default:"guest" },
        createdat:{type: Date, required:true},
    });
    return mongoose.models.subjectinstance || mongoose.model('subjectinstance', schema);
})()
