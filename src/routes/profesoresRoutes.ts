import express, { Request, Response } from 'express';
import * as profesoresControllers from '../controllers/profesorescontroller';
import {Profesores } from '../models/profesoresModels';
import { getByteacher } from '../controllers/profesorescontroller'; // Ajusta la ruta de importación aquí sea necesario

const profesoresRoutes = express.Router();
//total
profesoresRoutes.get('/', async (req: Request, res: Response) => {
    profesoresControllers.getAll((err: Error, profesores: Profesores[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(profesores);
    });
});

//por id
profesoresRoutes.get('/:id_p', (req, res) => {
    const id_p = parseInt(req.params.id_p, 10);

    getByteacher(id_p, (err: any, profesores: Profesores) => {
        if (err) {
            console.error('Error al obtener los profesores:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        res.json(profesores);
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