import express, { Request, Response } from 'express';
import * as inscribeControllers from '../controllers/inscribeControllers';
import { Inscribe } from '../models/inscribeModels';

const inscribeRoutes = express.Router();

inscribeRoutes.post('/', async (req: Request, res: Response) => {
    const newInscribe: Inscribe = req.body;
    inscribeControllers.create(newInscribe, (err: Error, insertId: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(201).json({ 'insertId': insertId });
    });
});

inscribeRoutes.get('/asignatura/:cod_a/grupo/:grupo', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    inscribeControllers.getBySubjectAndGroup(cod_a, grupo, (err: Error, results: Inscribe[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(results);
    });
});

inscribeRoutes.get('/estudiante/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    inscribeControllers.getByStudent(cod_e, (err: Error, results: Inscribe[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(results);
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
