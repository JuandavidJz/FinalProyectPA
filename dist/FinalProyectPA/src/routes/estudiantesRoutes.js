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
exports.estudiantesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const estudiantesControllers = __importStar(require("../controllers/estudiantesControllers"));
//import * as inscribeControllers from '../controllers/inscribeControllers';
//import {Inscribe } from '../models/inscribeModels';
const app = (0, express_1.default)();
const estudiantesRoutes = express_1.default.Router();
exports.estudiantesRoutes = estudiantesRoutes;
estudiantesRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newEstudiantes = req.body;
    console.log(req.body);
    estudiantesControllers.create(newEstudiantes, (err, cod_e) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(201).json({ 'Estudiante: ': cod_e });
    });
}));
estudiantesRoutes.put('/:cod_e', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_e = parseInt(req.params.cod_e, 10);
    const estudiante = req.body;
    console.log(cod_e);
    estudiantesControllers.update(cod_e, estudiante, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'Estudiante no encontrado' });
        }
        res.status(200).json({ 'message': 'Estudiante actualizado correctamente' });
    });
}));
estudiantesRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    estudiantesControllers.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(200).json(results);
    });
}));
