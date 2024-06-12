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
exports.inscribeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const inscribeControllers = __importStar(require("../controllers/inscribeControllers"));
const inscribeRoutes = express_1.default.Router();
exports.inscribeRoutes = inscribeRoutes;
inscribeRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newInscribe = req.body;
    inscribeControllers.create(newInscribe, (err, insertId) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(201).json({ 'insertId': insertId });
    });
}));
inscribeRoutes.get('/asignatura/:cod_a/grupo/:grupo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    inscribeControllers.getBySubjectAndGroup(cod_a, grupo, (err, results) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(200).json(results);
    });
}));
inscribeRoutes.get('/estudiante/:cod_e', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_e = parseInt(req.params.cod_e);
    inscribeControllers.getByStudent(cod_e, (err, results) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(200).json(results);
    });
}));
inscribeRoutes.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateInscribe = req.body;
    inscribeControllers.updateGrades(updateInscribe, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(200).json(result);
    });
}));
inscribeRoutes.delete('/:cod_e/:grupo/:cod_a/:id_p', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_e = parseInt(req.params.cod_e);
    const grupo = parseInt(req.params.grupo);
    const cod_a = parseInt(req.params.cod_a);
    const id_p = parseInt(req.params.id_p);
    const deleteInscribe = { cod_e, grupo, cod_a, id_p, n1: 0, n2: 0, n3: 0 };
    inscribeControllers.deleteInscribe(deleteInscribe, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(200).json({ 'message': 'Registro eliminado exitosamente' });
    });
}));
