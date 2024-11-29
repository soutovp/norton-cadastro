import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'ejs';
//Routes
import { router as compradoresRoutes } from './src/cadastros/compradoresRoutes.js';
import { router as compradoresApi } from './src/api/comprador.js';
import { router as empresasRoutes } from './src/cadastros/empresasRoutes.js';
const app = express();
const port = 80;
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
app.use('/cadastros/compradores', compradoresRoutes);
app.use('/cadastros/empresas', empresasRoutes);
app.use('/api', compradoresApi);

app.get('/', (req, res) => {
	res.render('home/home.ejs', {
		data: {
			title: 'Norton Distribuidora',
			page: 'index.ejs',
		},
	});
});
app.get('/cadastro/comprador', (req, res) => {
	res.render('home/home.ejs', {
		data: {
			title: 'Cadstro',
			page: 'cadastro.ejs',
		},
	});
});
app.listen(port, () => {
	console.log(`Ouvindo a porta ${port}`);
});
