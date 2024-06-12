import express, { Request, Response } from 'express';
import * as inscribeControllers from '../controllers/inscribeControllers';
import { Inscribe } from '../models/inscribeModels';
import { getByStudent } from '../controllers/inscribeControllers'; // Ajusta la ruta de importación según sea necesario

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

inscribeRoutes.delete('/:cod_e/:grupo/:cod_a/:id_p', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const grupo = parseInt(req.params.grupo);
    const cod_a = parseInt(req.params.cod_a);
    const id_p = parseInt(req.params.id_p);
    const deleteInscribe: Inscribe = { cod_e, grupo, cod_a, id_p, n1: 0, n2: 0, n3: 0 };
    inscribeControllers.deleteInscribe(deleteInscribe, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json({ 'message': 'Registro eliminado exitosamente' });
    });
});

export { inscribeRoutes };
