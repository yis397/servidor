import { gql } from "apollo-server";

const typeDefs=gql`
"""Usuario"""
 type Usuario{
     id:ID
     nombre:String
     apellido:String
     correo: String
     creado:String,
     password:String,
     direccion:String
 }
 input UsuarioInput{
    nombre:String!
    apellido:String!
    correo: String!
    password:String!
 }
 input AuthInput{
        correo: String!
        password: String!
    }
input UpdateUsuario{
     nombre:String
     apellido:String
     direccion:String
    }
 type Token{
     token:String
 }

"""Producto"""
 type Producto{
    id:ID,
    nombre:String,
    cantidad:Int,
    precio:Float,
    img:String,
    vendedor:String,
    marca:String,
    tags:[Tags]
 }
  enum Tags{
   
    electronica,ropa,alimentos
 }
 input inputProducto{
    nombre:String!,
    cantidad:Int!,
    precio:Float!,
    marca:String!,
    tags:Tags!
 } 


  type Query{
      getUsuarioToken(token:String):Usuario
      
      
      #productos
      getProductos:[Producto]

      getProducto(id:ID!):Producto
  }
  type Mutation{
      """usuario"""
      nuevoUsuario(input:UsuarioInput):Usuario
      loginUsuario(input:AuthInput):Token
      updateUsuario(input:UpdateUsuario):Usuario
      """producto"""
      nuevoProducto(input:inputProducto):Producto
      updateProducto(id:ID!,input:inputProducto):Producto
      deletProducto(id:ID!):String

  }
`
export default typeDefs;