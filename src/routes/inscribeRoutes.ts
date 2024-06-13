import express, { Request, Response } from 'express';
import * as inscribeControllers from '../controllers/inscribeControllers';
import { Inscribe } from '../models/inscribeModels';
import { getByStudent } from '../controllers/inscribeControllers';
import { getAllInscribe } from '../controllers/inscribeControllers'; // Ajusta la ruta de importación según sea necesario
import { getStudentAndNotesByAsignaturaAndGrupo } from '../controllers/inscribeControllers';

const inscribeRoutes = express.Router();

//total
inscribeRoutes.get('/all', (req, res) => {
    getAllInscribe((err: Error, inscribes: Inscribe[]) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(inscribes);
    });
});


//estudiante nota



inscribeRoutes.get('/', (req, res) => {
    const cod_a = parseInt(req.query.cod_a as string);
    const grupo = parseInt(req.query.grupo as string);

    if (isNaN(cod_a) || isNaN(grupo)) {
        return res.status(400).json({ error: 'Invalid cod_a or grupo parameter' });
    }

    getStudentAndNotesByAsignaturaAndGrupo(cod_a, grupo, (err: Error, studentsAndNotes: { cod_e: number, nom_e: string, n1?: number, n2?: number, n3?: number }[]) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(studentsAndNotes);
    });
});


inscribeRoutes.post('/', async (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body;
    inscribeControllers.create(newInscribe, (err: Error, insertId: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(201).json({ 'insertId': insertId });
    });
});
inscribeRoutes.get('/:cod_e', (req, res) => {
    const cod_e = parseInt(req.params.cod_e);

    getByStudent(cod_e, (err: any, inscribe: any) => {
        if (err) {
            console.error('Error al obtener los datos:', err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }
        res.json(inscribe);
    });
});


inscribeRoutes.put('/', async (req: Request, res: Response) => {
    const updateInscribe: Inscribe = req.body;
    inscribeControllers.updateGrades(updateInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(result);
    });
});


export { inscribeRoutes };
