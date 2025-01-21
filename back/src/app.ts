import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';



const app = express();


app.set('port', 3000);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '215mb' }));
app.use(express.urlencoded({ limit: '215mb', extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,contentType,Content-Type,Accept,Authorization");
    next();
});

// Endpoint de ejemplo
app.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});


export default app;