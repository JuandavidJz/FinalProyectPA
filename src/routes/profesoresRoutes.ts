import express, { Request, Response } from 'express';
import * as profesoresControllers from '../controllers/profesorescontroller';
import {Profesores } from '../models/profesoresModels';

const profesoresRoutes = express.Router();

profesoresRoutes.get('/', async (req: Request, res: Response) => {
    profesoresControllers.getAll((err: Error, profesores: Profesores[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(profesores);
    });
});



profesoresRoutes.post('/', async (req: Request, res: Response) => {
	const newProfesores: Profesores = req.body;
	profesoresControllers.create(newProfesores, (err: Error, id_p: number) => {
		if (err) {
			return res.status(500).json({ 'message': err.message });
		}

		res.status(201).json({ 'Profesor: ': id_p  });
	});
});

export {profesoresRoutes};