"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
 type Usuario{
     id:ID
     nombre:String
     apellido:String
     correo: String
     creado:String,
     password:String
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
  type Query{
      obtenerAlgo:String
  }
  type Mutation{
      nuevoUsuario(input:UsuarioInput):Usuario
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map