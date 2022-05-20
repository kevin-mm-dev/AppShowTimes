import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import moviesRoutes from './routes';
import path from 'path';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/public', express.static('public'))
// app.use('public',express.static(path.join(__dirname, 'public')));
// app.use('public',express.static(path.resolve('public')));
app.use('/api',moviesRoutes); 









export default app;