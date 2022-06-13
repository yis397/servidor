import mongoose, { Schema, model, Model } from 'mongoose';
import { IProducto } from '../interfaces';



const productSchema = new Schema({
    nombre:{
        type:String,
        required:[true,"nombre requerido"]
    },
    cantidad:{
        type:Number,
        required:[true,"cantidad requerido"]
    },
    precio:{
        type:Number,
        required:[true,"precio requerido"]
    },
    img:{
        type:String,
    },
    vendedor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Usuario"
    },
    creado:{
        type:Date,
        default:Date.now()
    },
    marca:{
        type:String,
        required:[true,"Marca requerido"]
    },
    tags:{
        type: String,
        enum: {
            values: ['electronica','ropa','alimentos'],
            message: '{VALUE} no es un tipo válido'
        }
    }

});


productSchema.index({ title: 'text', tags: 'text' });


const Producto: Model<IProducto> = mongoose.models.Product || model('Producto', productSchema );


export default Producto;