import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;
interface ISubject{
    name:string,
    abbrev:string,
    createdat:Date,
    uuid:string,
    schoolid:string
}
export const Subject:mongoose.Model<ISubject> =(() =>{
    const schema = new Schema<ISubject>({
        name: { type: String, required: true },
        abbrev: { type: String, required: true },
        createdat:{type: Date, required:true},
        uuid:{type: String,unique: true, required:true},
        schoolid:{type: String}
    });
    return mongoose.models.subject || mongoose.model<ISubject>('subject', schema);
})()
interface ISubjectInstance{
    subjectid:string,
    name:string,
    createdat:Date,
    uuid:string,
    authorid:string
}
export const SubjectInstance:mongoose.Model<ISubjectInstance>=(()=>{
    const schema = new Schema({
        subjectid: { type: String, required: true },
        name:{type: String, required:true},
        uuid:{type: String,unique: true, required:true},
        createdat:{type: Date, required:true},
        authorid:{type: String, required:true},
    });
    return mongoose.models.subjectinstance || mongoose.model<ISubjectInstance>('subjectinstance', schema);
})()
interface IUserSubjectInstanceRelation{
    userid:string,
    subjectinstanceid:string,
    createdat:Date,
    role:string,
}
export const UserSubjectInstanceRelation:mongoose.Model<IUserSubjectInstanceRelation>=(()=>{
    const schema = new Schema({
        userid:{ type: String, required: true },
        subjectinstanceid: { type: String, required: true },
        role: { type: String, required: true,default:"guest" },
        createdat:{type: Date, required:true},
    });
    schema.index({userid:1,subjectinstanceid:1})
    return mongoose.models.subjectinstance || mongoose.model<IUserSubjectInstanceRelation>('subjectinstance', schema);
})()
