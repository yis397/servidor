"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsuarioJWT = exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (usuario) => {
    const { nombre, apellido, correo, id } = usuario;
    return jsonwebtoken_1.default.sign({ nombre, apellido, correo, id }, process.env.SECRET || "", { expiresIn: "8h" });
};
exports.getToken = getToken;
const getUsuarioJWT = (token) => {
    const usuario = jsonwebtoken_1.default.verify(token, process.env.SECRET || "");
    return usuario;
};
exports.getUsuarioJWT = getUsuarioJWT;
//# sourceMappingURL=jwToken.js.map