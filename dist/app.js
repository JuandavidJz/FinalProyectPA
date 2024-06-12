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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const bodyParser = __importStar(require("body-parser"));
const estudiantesRoutes_1 = require("./src/routes/estudiantesRoutes");
const cors_1 = __importDefault(require("cors"));
const asignaturasRoutes_1 = require("./src/routes/asignaturasRoutes");
const profesoresRoutes_1 = require("./src/routes/profesoresRoutes");
//import { imparteRoutes } from "./src/routes/imparteRoutes";
//import { inscribeRoutes } from "./src/routes/inscribeRoutes";
const app = (0, express_1.default)();
dotenv.config();
app.use((0, cors_1.default)());
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use('/estudiantes', estudiantesRoutes_1.estudiantesRoutes);
app.use('/profesores', profesoresRoutes_1.profesoresRoutes);
app.use('/asignaturas', asignaturasRoutes_1.asignaturasRoutes);
//app.use('/imparte', imparteRoutes)
//app.use('/inscribe', inscribeRoutes)
app.get('/', (req, res) => {
    res.type('text/plain');
    res.status(200).send('Welcome!');
});
app.use(bodyParser.json());
db_1.db.connect((err) => {
    if (err) {
        console.log('Database connection error');
    }
    else {
        console.log('Database Connected');
    }
});
app.use((req, res) => {
    res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});
app.listen(process.env.PORT, () => {
    console.log('Node server started running');
    console.log(`Go to http://${process.env.UniHOST}:${process.env.PORT}`);
});
