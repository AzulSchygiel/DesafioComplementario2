import mongoose from "mongoose";

const collection = "Productos";

const schema = new mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    ropa:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Ropa'
    }
})

const productosModel = mongoose.model(collection,schema);

export default productosModel;
