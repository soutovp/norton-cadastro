import express from 'express';
import { connection } from './connection.js';
const app = express();
const port = 80;
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.post('/teste', (req, res) => {
	const { cnpj } = req.body;
	console.log('Validando procura no Banco de Dados');
	connection.query(`SELECT * FROM clientes WHERE cnpj = ${cnpj};`, (err, results, fields) => {
		if (err) {
			console.error(err);
		}
		if (results.length > 0) {
			const n = results.length;
			for (let i = 0; i < n; i++) {
				console.log(`CNPJ existente.. ${results[i]}`);
			}
		} else {
			console.log(`cnpj ${cnpj} inexistente...`);
		}
		res.send(`Resultado: ${JSON.stringify(results)}`);
	});
});

app.post('/cadastrar', async (req, res) => {
	const { comprador, recebedor, cnpj, telefone, celular, email, email_faturado, atividade, cep, logradouro, numero, complemento } = req.body;

	connection.query(`SELECT * FROM clientes WHERE cnpj = ${cnpj}`, (err, results, fields) => {
		if (err) {
			console.error(err);
		}
		if (results) {
			console.log(fields);
			res.send('OK');
			if (results[0].count > 0) {
				console.log('Cliente já existente...');
			}
		}
	});

	// const insertQuery = `
	//         INSERT INTO clientes (
	//             comprador, recebedor, cnpj, telefone, celular, email, email_faturado, atividade, cep, logradouro, numero, complemento
	//         )
	//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
	//     `;
	// connection.query(insertQuery, [comprador, recebedor, cnpj, telefone, celular, email, email_faturado, atividade, cep, logradouro, numero, complemento], (err, results) => {
	// 	if (err) {
	// 		console.error(err);
	// 		res.status(500).json({ message: `${err}` });
	// 	}
	// 	res.status(201).json({ message: 'Cliente cadastrado com sucesso!', results });
	// });
});

app.post('/delete', async (req, res) => {
	const { cnpj } = req.body;
});

app.listen(port, () => {
	console.log(`Ouvindo a porta ${port}`);
});
