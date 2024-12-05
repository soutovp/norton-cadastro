import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import 'ejs';
//Routes
import { router as api } from './src/api/api.js';
import { router as cadastro } from './src/cadastros/cadastros.js';
import { router as webRoutes } from './src/routes/routes.js';
const app = express();
const port = 80;
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10kb' }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/static', express.static(path.join(__dirname, 'public')));
const allowedOrigins = ['http://127.0.0.1:5500', 'http://127.0.0.1:80', 'http://192.168.118.188'];
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true); // Permite a requisição
			} else {
				callback(new Error('Não permitido pela política de CORS')); // Bloqueia a requisição
			}
		},
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/cadastros', cadastro);
app.use('/api', api);
app.use('/', webRoutes);

app.listen(port, () => {
	console.log(`Ouvindo a porta ${port}`);
});
