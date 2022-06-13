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
const jwToken_1 = require("../helpers/jwToken");
const Producto_1 = __importDefault(require("../models/Producto"));
const resolvers = {
    Query: {
        getUsuarioToken: (_, {}, ctx) => {
            return ctx.usuario;
        },
        //productos
        getProductos: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const productos = yield Producto_1.default.findById({});
                return productos;
            }
            catch (error) {
                throw new Error("error en get Productos");
            }
        }),
        getProducto: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            const existProducto = yield Producto_1.default.findOne({ _id: id });
            if (!existProducto)
                throw new Error("erro en get Producto");
            return existProducto;
        })
    },
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
        }),
        loginUsuario: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const { password, correo } = input;
            const existUsuario = yield Usuario_1.default.findOne({ correo });
            if (!existUsuario) {
                throw new Error("correo inexstente");
            }
            const veriPassword = yield bcryptjs_1.default.compare(password, existUsuario.password);
            if (!veriPassword) {
                throw new Error("password incorrecto");
            }
            const token = (0, jwToken_1.getToken)(existUsuario);
            return { token };
        }),
        updateUsuario: (_, { input }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const newUsuario = yield Usuario_1.default.findOneAndUpdate({ _id: ctx.usuario.id }, input, { new: true });
            return newUsuario;
        }),
        //Productos
        nuevoProducto: (_, { input }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const producto = yield new Producto_1.default(Object.assign(Object.assign({}, input), { vendedor: ctx.usuario.id }));
            producto.save();
            return producto;
        }),
        updateProducto: (_, { id, input }) => __awaiter(void 0, void 0, void 0, function* () {
            let producto = yield Producto_1.default.findById(id);
            if (!producto)
                throw new Error("producto inexistente");
            try {
                producto = yield Producto_1.default.findOneAndUpdate({ _id: id }, input, { new: true });
                return producto;
            }
            catch (error) {
                throw new Error("erro al actualizar");
            }
        }),
        deletProducto: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            let producto = yield Producto_1.default.findById(id);
            if (!producto)
                throw new Error("producto inexistente");
            try {
                yield Producto_1.default.findOneAndDelete({ _id: id });
                return "producto eliminado";
            }
            catch (error) {
                throw new Error("erro al actualizar");
            }
        })
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map