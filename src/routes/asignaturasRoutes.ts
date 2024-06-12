import express, { Request, Response } from 'express';
import * as asignaturasControllers from '../controllers/asignaturasControllers';
import {Asignaturas } from '../models/asignaturasModels';
const asignaturasRoutes = express.Router();

asignaturasRoutes.post('/', async (req: Request, res: Response) => {
	const newAsignaturas: Asignaturas = req.body;
	asignaturasControllers.create(newAsignaturas, (err: Error, cod_a: number) => {
		if (err) {
			return res.status(500).json({ 'message': err.message });
		}

		res.status(201).json({ 'Asignaturas: ': cod_a  });
	});
});

asignaturasRoutes.get('/', async (req: Request, res: Response) => {
    asignaturasControllers.getAll((err: Error, asignaturas: Asignaturas[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(asignaturas);
    });
});

asignaturasRoutes.post('/', async (req: Request, res: Response) => {
    const newAsignaturas: Asignaturas = req.body;
    asignaturasControllers.create(newAsignaturas, (err: Error, cod_a: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(201).json({ 'Asignaturas: ': cod_a  });
    });
});

// Método DELETE para eliminar una asignatura por su código
asignaturasRoutes.delete('/:cod_a', async (req: Request, res: Response) => {
    const cod_a: string = req.params.cod_a;
    asignaturasControllers.deleteAsig(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json({ 'message': 'Asignatura eliminada exitosamente' });
    });
});


export {asignaturasRoutes};