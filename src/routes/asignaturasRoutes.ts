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

export {asignaturasRoutes};