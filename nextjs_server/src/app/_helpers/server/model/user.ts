import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;
interface IUser{
    name:string,
    password:string,
    email:string,
    createdat:Date,
    uuid:string,
    position:string
}
export const User:mongoose.Model<IUser>= (()=> {
    const schema = new Schema({
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String,unique: true, required: true },
        createdat:{type: Date, required:true},
        uuid:{type: String,unique: true, required:true},
        position:{type: String,default:"user",enum:["user","admin"], required:true},
    });
    return mongoose.models.user|| mongoose.model<IUser> ('user', schema);
})()
