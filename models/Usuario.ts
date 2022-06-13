import mongoose,{ Schema,model,Model } from "mongoose";
import { IUser } from '../interfaces';

const UsuarioSchema=new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol: {
        type: String,
        required: true,
        default: 'user',
        emun: ['admin', 'user']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
     comprados:{
      type:Number,
      default:0
    },
    creado:{
        type:Date,
        default:Date.now()
    },
    direccion:{
        type:String,
        
    }
})

const Usuario:Model<IUser>=mongoose.models.Usuario||model('Usuario',UsuarioSchema);
export default Usuario;