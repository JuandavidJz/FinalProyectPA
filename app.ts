import * as dotenv from "dotenv";
import express, { Request, Response } from 'express';
import { db } from './db';
import * as bodyParser from "body-parser";
import {estudiantesRoutes} from './src/routes/estudiantesRoutes';
import cors from 'cors';
import { asignaturasRoutes } from "./src/routes/asignaturasRoutes";
import { profesoresRoutes } from "./src/routes/profesoresRoutes";
//import { imparteRoutes } from "./src/routes/imparteRoutes";
//import { inscribeRoutes } from "./src/routes/inscribeRoutes";


const app = express();
dotenv.config()

app.use(bodyParser.json());
app.use('/estudiantes',estudiantesRoutes)
app.use('/profesores',profesoresRoutes)
app.use('/asignaturas',asignaturasRoutes)
//app.use('/imparte', imparteRoutes)
//app.use('/inscribe', inscribeRoutes)


app.get('/', (req, res) => {
	res.type('text/plain');
	res.status(200).send('Welcome!');
});

app.use(bodyParser.json());
app.use(cors);

db.connect((err) => {
	if (err) {
		console.log('Database connection error');
	} else {
		console.log('Database Connected');
	}
});

app.use((req: Request, res: Response) => {
	res.status(404).send({ error: 'Not Found', message: 'URL not found' });
});


app.listen(process.env.PORT, () => {
	console.log('Node server started running');
	console.log(`Go to http://${process.env.UniHOST}:${process.env.PORT}`);
});

