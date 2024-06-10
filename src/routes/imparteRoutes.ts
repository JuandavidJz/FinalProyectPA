/*

import express, { Request, Response } from 'express';
import * as imparteControllers from '../controllers/imparteControllers';
import { Imparte } from '../models/imparteModels';

const imparteRoutes = express.Router();

imparteRoutes.post('/', async (req: Request, res: Response) => {
    const newImparte: Imparte = req.body;
    imparteControllers.create(newImparte, (err: Error, result: { grupo: number, cod_a: number, id_p: number }) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(201).json({ 'Imparte': result });
    });
});

imparteRoutes.get('/', async (req: Request, res: Response) => {
    imparteControllers.getAll((err: Error, results: Imparte[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(results);
    });
});


export { imparteRoutes };
*/
