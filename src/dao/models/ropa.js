import mongoose from 'mongoose';

const collection = 'Ropa';

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    wist:{
        type:Number,
        required:true
    },
    color:String,
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    image:String
})

const ropaModel = mongoose.model(collection,schema);

export default ropaModel;
