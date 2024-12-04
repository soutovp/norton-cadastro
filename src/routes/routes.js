import e from 'express';
export const router = e.Router();

//routes
router.get('/', (req, res) => {
	res.render('home/home.ejs', {
		data: {
			title: 'Norton Distribuidora',
			page: 'index.ejs',
		},
	});
});
router.get('/cadastro/comprador', (req, res) => {
	res.render('home/home.ejs', {
		data: {
			title: 'Cadstro',
			page: 'cadastro/cadastroComprador.ejs',
			styles: null,
			scripts: ['cadastro/compradores/compradores.js'],
		},
	});
});
router.get('/cadastro/empresa', (req, res) => {
	res.render('home/home.ejs', {
		data: {
			title: 'Empresa',
			page: 'cadastro/cadastroEmpresa.ejs',
			styles: null,
			scripts: ['cadastrarEmpresa.js'],
		},
	});
});
router.get('/cadastro/endereco', (req, res) => {
	res.render('home/home.ejs', {
		data: {
			title: 'Cadastro de Endereço',
			page: 'cadastro/cadastroEndereco.ejs',
			styles: null,
			scripts: ['endereco.js'],
		},
	});
});
router.get('/cadastro/geral', (req, res) => {
	res.render('home/home.ejs', {
		data: {
			title: 'Cadastro Geral',
			page: 'cadastro/cadastroGeral.ejs',
			styles: ['cadastro_geral'],
			scripts: ['cadastro/geral/geral.js'],
		},
	});
});
