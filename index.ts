import { ApolloServer } from "apollo-server";
import conectarDB from "./config/db";
import dotenv from "dotenv";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { getUsuarioJWT } from './helpers/jwToken';
dotenv.config()

conectarDB();



const server=new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const token = req.headers['authorization'] || '';
        try {
            const usuario=getUsuarioJWT(token);
            return{
                usuario
            }
        } catch (error) {
        }
    }
})
server.listen().then(({url})=>{
    console.log("conectado"+url)
})