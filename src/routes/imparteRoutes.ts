import express, { Request, Response } from 'express';
import * as imparteControllers from '../controllers/imparteControllers';
import { Imparte } from '../models/imparteModels';
import { getByProfId } from '../controllers/imparteControllers'; // Ajusta la ruta de importación según sea necesario
import { updateImparte } from '../controllers/imparteControllers'; // Ajusta la ruta de importación según sea necesario


const app = express();
const imparteRoutes = express.Router();


imparteRoutes.get('/', async (req: Request, res: Response) => {
    imparteControllers.getAll((err: Error, results: Imparte[]) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        res.status(200).json(results);
    });
});


//por id_p
imparteRoutes.get('/:id_p', (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);

    getByProfId(id_p, (err: any, impartes: Imparte[]) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener los registros de Imparte.' });
        }
        res.json(impartes);
    });
});

imparteRoutes.post('/', async (req: Request, res: Response) => {
    const newImparte: Imparte = req.body;
    imparteControllers.create(newImparte, (err: Error, result: { grupo: number, cod_a: number, id_p: number }) => {
        if (err) {
            return res.status(404).json({ 'message': err.message });
        }

        res.status(201).json({ 'Imparte': result });
    });
});


//ACTUALIZAR
imparteRoutes.put('/:grupo', (req, res) => {
	const grupo = parseInt(req.params.grupo, 10);
	const imparte: Imparte = req.body;

    updateImparte(grupo, imparte, (err: any, affectedRows: any) => {
        if (err) {
            console.error('Error al actualizar registro en imparte:', err);
            res.status(500).json({ error: 'Error al actualizar registro en imparte' });
            return;
        }

        res.json({ affectedRows });
    });
});


imparteRoutes.delete('/:id_p', async (req: Request, res: Response) => {
    const id_p: number = Number(req.params.id_p);
    imparteControllers.deleteImparte(id_p, (err: Error, result: any) => {
        if (err) {
            return res.status(404).json({ 'message': err.message });
        }

        res.status(200).json({ 'message': 'Registro eliminado exitosamente' });
    });
});

export {imparteRoutes };

