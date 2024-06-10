import express, { Request, Response } from 'express';
import * as estudiantesControllers from '../controllers/estudiantesControllers';
import * as create from '../controllers/estudiantesControllers';
import {Estudiantes } from '../models/estudiantesModels';
//import * as inscribeControllers from '../controllers/inscribeControllers';
//import {Inscribe } from '../models/inscribeModels';

const app = express();
const estudiantesRoutes = express.Router();

estudiantesRoutes.post('/', async (req: Request, res: Response) => {
    const newEstudiantes: Estudiantes = req.body;
    console.log(req.body); 
    estudiantesControllers.create(newEstudiantes, (err: Error, cod_e: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(201).json({ 'Estudiante: ': cod_e });
    });
});


estudiantesRoutes.put('/:cod_e', async (req: Request, res: Response) => {
	const cod_e = parseInt(req.params.cod_e, 10);
	const estudiante: Estudiantes = req.body;
    console.log(cod_e);

	estudiantesControllers.update(cod_e, estudiante, (err: Error, affectedRows: number) => {
		if (err) {
			return res.status(500).json({ 'message': err.message });
		}

		if (affectedRows === 0) {
			return res.status(404).json({ 'message': 'Estudiante no encontrado' });
		}

		res.status(200).json({ 'message': 'Estudiante actualizado correctamente' });
	});
});

estudiantesRoutes.get('/', async (req: Request, res: Response) => {
    estudiantesControllers.getAll((err: Error, results: Estudiantes[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(results);
    });
});


/*estudiantesRoutes.get('/asignatura/:cod_a/grupo/:grupo', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a);
    const grupo = parseInt(req.params.grupo);
    inscribeControllers.getBySubjectAndGroup(cod_a, grupo, (err: Error, results: Inscribe[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(results);
    });
});
*/

export {estudiantesRoutes};