import express, { Request, Response } from 'express';
import * as asignaturasControllers from '../controllers/asignaturasControllers';
import {Asignaturas } from '../models/asignaturasModels';
import { getBySignature } from '../controllers/asignaturasControllers'; // Ajusta la ruta de importación según sea necesario


const asignaturasRoutes = express.Router();

//total
asignaturasRoutes.get('/', async (req: Request, res: Response) => {
    asignaturasControllers.getAll((err: Error, asignaturas: Asignaturas[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(asignaturas);
    });
});


//por id

asignaturasRoutes.get('/:cod_a', (req, res) => {
    const cod_a = parseInt(req.params.cod_a);

         getBySignature(cod_a, (err: any, asignaturas: Asignaturas) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener las asignaturas' });
        }

        res.json(asignaturas);
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



asignaturasRoutes.delete('/:cod_a', async (req: Request, res: Response) => {
    const cod_a: string = req.params.cod_a;
    asignaturasControllers.deleteAsig(cod_a, (err: Error, result: any) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json({ 'message': 'Asignatura eliminada exitosamente' });
    });
});

asignaturasRoutes.put('/:cod_a', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.params.cod_a, 10);
    const asignatura: Asignaturas = req.body;
    console.log(cod_a);

    asignaturasControllers.update(cod_a, asignatura, (err: Error, affectedRows: number) => {
        if (err) {
            console.error('Error al actualizar los datos:', err);
            return res.status(500).json({ 'message': err.message });
        }

        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'Asignatura no encontrada' });
        }
        console.log(affectedRows);

        res.status(200).json({ 'message': 'Asignatura actualizada correctamente' });
    });
});


export {asignaturasRoutes};