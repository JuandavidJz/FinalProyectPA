import { Profesores} from '../models/profesoresModels';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';


export const create = (profesores: Profesores, callback: Function) => {
	const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';

	db.query(
		queryString,
		[profesores.id_p, profesores.nom_p, profesores.dir_p, profesores.tel_p, profesores.profesion],
		(err, result) => {
			if (err) { callback(err); }

			const insertId = (<OkPacket>result).insertId;
			callback(null, insertId);
		}
	);
};