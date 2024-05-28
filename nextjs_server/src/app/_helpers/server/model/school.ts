import { bool } from 'joi';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.pluralize(null);
mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const School =(()=> {
    const schema = new Schema({
        name:{type: String, required:true},
        abbrev:{type: String, required:true,unique:true},
        uuid:{type: String,unique: true, required:true},
        createdat:{type: Date, required:true},
    });
    return mongoose.models.school || mongoose.model('school', schema);
})()
