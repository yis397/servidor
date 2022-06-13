"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../models/Usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const resolvers = {
    Query: {},
    Mutation: {
        nuevoUsuario: (__, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { correo, password } = input;
            // Revisar si el usuario ya esta registrado
            const existeUsuario = yield Usuario_1.default.findOne({ correo });
            if (existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            }
            // Hashear su password
            const salt = yield bcryptjs_1.default.genSalt(10);
            input.password = yield bcryptjs_1.default.hash(password, salt);
            try {
                // Guardarlo en la base de datos
                const usuario = new Usuario_1.default(input);
                usuario.save(); // guardarlo
                return usuario;
            }
            catch (error) {
                console.log("erro al agragar usuario");
            }
        })
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map