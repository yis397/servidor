"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const jwToken_1 = require("./helpers/jwToken");
dotenv_1.default.config();
(0, db_1.default)();
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: ({ req }) => {
        const token = req.headers['authorization'] || '';
        try {
            const usuario = (0, jwToken_1.getUsuarioJWT)(token);
            return {
                usuario
            };
        }
        catch (error) {
        }
    }
});
server.listen().then(({ url }) => {
    console.log("conectado" + url);
});
//# sourceMappingURL=index.js.map