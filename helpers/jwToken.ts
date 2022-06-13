import jwt from "jsonwebtoken"
import { IUser } from '../interfaces';


export const getToken=(usuario:IUser,)=>{
   const {nombre,apellido,correo,id}=usuario;
   return jwt.sign({nombre,apellido,correo,id},process.env.SECRET||"",{expiresIn:"8h"})
}
export const getUsuarioJWT=(token:string)=>{
      const usuario=  jwt.verify(token,process.env.SECRET||"");
      return usuario
}