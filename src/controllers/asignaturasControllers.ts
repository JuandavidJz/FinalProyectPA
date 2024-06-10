import { Asignaturas} from '../models/asignaturasModels';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';


export const create = (asignaturas: Asignaturas, callback: Function) => {
	const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos_a) VALUES (?, ?, ?, ?)';

	db.query(
		queryString,
		[asignaturas.cod_a, asignaturas.nom_a, asignaturas.int_h, asignaturas.creditos_a],
		(err, result) => {
			if (err) { callback(err); }

			const insertId = (<OkPacket>result).insertId;
			callback(null, insertId);
		}
	);
};