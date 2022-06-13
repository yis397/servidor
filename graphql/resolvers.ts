
import Usuario from '../models/Usuario';
import bcryptjs from 'bcryptjs';
import { IUser } from '../interfaces/model';

import { getUsuarioJWT,getToken } from '../helpers/jwToken';
import Producto from '../models/Producto';

interface Prop{
    usuario:IUser
}

const resolvers={
    Query:{
        getUsuarioToken:(_:any,{}:any,ctx:Prop)=>{
          return ctx.usuario;
        },
        //productos
        getProductos:async()=>{
            try {
             const productos=await Producto.findById({});
             return productos;
            } catch (error) {
                throw new Error("error en get Productos");
                
            }
        },
        getProducto:async(_:any,{id}:any)=>{
            const existProducto=await Producto.findOne({_id:id});
            if (!existProducto) throw new Error("erro en get Producto");
            return existProducto;
            
        }

    },

    Mutation:{
        
        nuevoUsuario:async(__:any,{input}:any)=>{
            const { correo, password} = input;
            
            // Revisar si el usuario ya esta registrado
            const existeUsuario = await Usuario.findOne({correo});
            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }

            // Hashear su password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                 // Guardarlo en la base de datos
                const usuario = new Usuario(input);
                usuario.save(); // guardarlo
                return usuario;
            } catch (error) {
                console.log("erro al agragar usuario");
            }
        },
        loginUsuario:async(_:any,{input}:any)=>{
           const {password,correo}=input;
           const existUsuario:IUser|any=await Usuario.findOne({correo});
           if (!existUsuario){
               throw new Error("correo inexstente");
           }
           const veriPassword=await bcryptjs.compare(password,existUsuario.password)
           if (!veriPassword) {
            throw new Error("password incorrecto");
           }
           const token:string=getToken(existUsuario);
           return {token}

        },
        updateUsuario:async(_:any,{input}:any,ctx:Prop)=>{
            const newUsuario=await Usuario.findOneAndUpdate({_id:ctx.usuario.id},input,{new:true})
            return newUsuario
        },
        //Productos
        nuevoProducto:async(_:any,{input}:any,ctx:Prop)=>{
          
            const producto=await new Producto({...input,vendedor:ctx.usuario.id})
            producto.save();
            return producto
        },
        updateProducto:async(_:any,{id,input}:any)=>{
          let producto=await Producto.findById(id)
          if (!producto)throw new Error("producto inexistente")
          try {
              producto=await Producto.findOneAndUpdate({_id:id},input,{new:true});
              return producto;
          } catch (error) {
              throw new Error("erro al actualizar");   
          }
        },
        deletProducto:async(_:any,{id}:any)=>{
            let producto=await Producto.findById(id)
            if (!producto)throw new Error("producto inexistente")
            try {
                await Producto.findOneAndDelete({_id:id});
                return "producto eliminado";
            } catch (error) {
                throw new Error("erro al actualizar");   
            }

        }
    }
}
export default resolvers;