"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "nombre requerido"]
    },
    cantidad: {
        type: Number,
        required: [true, "cantidad requerido"]
    },
    precio: {
        type: Number,
        required: [true, "precio requerido"]
    },
    img: {
        type: String,
    },
    vendedor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Usuario"
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    marca: {
        type: String,
        required: [true, "Marca requerido"]
    },
    tags: {
        type: String,
        enum: {
            values: ['electronica', 'ropa', 'alimentos'],
            message: '{VALUE} no es un tipo válido'
        }
    }
});
productSchema.index({ title: 'text', tags: 'text' });
const Producto = mongoose_1.default.models.Product || (0, mongoose_1.model)('Producto', productSchema);
exports.default = Producto;
//# sourceMappingURL=Producto.js.map