import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/index.routes';
require('dotenv').config();

const app = express();


app.set('port', process.env.SERVER_PORT);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '215mb' }));
app.use(express.urlencoded({ limit: '215mb', extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,contentType,Content-Type,Accept,authorization");
    next();
});

// Endpoint de ejemplo
app.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

app.use('', indexRoutes);


export default app;