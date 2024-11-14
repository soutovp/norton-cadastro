import express from 'express';
import { connection } from './connection.js';
const app = express();
const port = 80;
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/teste', (req, res) => {
	console.log('Validando procura no Banco de Dados');
	connection.query('SELECT * FROM clientes WHERE cnpj = 20321476000156;', (err, results, fields) => {
		console.log(results);
		console.log(fields);
		res.send(`Resultado: ${JSON.stringify(results)}`);
	});
});

app.post('/cadastrar', async (req, res) => {
	const { comprador, recebedor, cnpj, telefone, celular, email, email_faturado, atividade, cep, logradouro, numero, complemento } = req.body;

	// Primeiro, verificar se o cliente já existe
	const checkQuery = `SELECT COUNT(*) AS count FROM clientes WHERE cnpj = ${cnpj}`;

	connection.query(checkQuery, (err, results, fields) => {
		console.log(results);
		if (results[0].count > 0) {
			console.log('Cliente já existente...');
			res.status(400).json({ messasge: 'Cliente já cadastrado com este cnpj.' });
		}
		console.log('Cliente não encontrado para o CNPJ fornecido');
	});
	const query = `
				INSERT INTO clientes (comprador, recebedor, cnpj, telefone, celular, email, email_faturado, atividade, cep, logradouro, numero, complemento)
            	VALUES (${comprador}, ${recebedor}, ${cnpj}, ${telefone}, ${celular}, ${email}, ${email_faturado}, ${atividade}, ${cep}, ${logradouro}, ${numero}, ${complemento})
			`;
	connection.query(query, (err, results, fields) => {
		res.status(500).json({ message: `${err}` });
	});

	// try {
	// 	// Realizando a consulta para verificar a existência do email
	// 	console.log('Verificando existência...');
	// 	const [checkResult] = await connection.execute(checkQuery, checkValues).then((data) => {
	// 		console.log(data);
	// 	});
	// 	// Se o cliente já existe, retorna um erro
	// 	if (checkResult[0].count > 0) {
	// 		console.log('Cliente já existe...');
	// 		res.status(400).json({ message: 'Cliente já cadastrado com este email.' });
	// 	}
	// 	console.log('Cliente não encontrado para o email fornecido');

	// 	// Se o cliente não existe, insere no banco de dados
	// 	const query = `
	//         INSERT INTO clientes (comprador, recebedor, cnpj, telefone, celular, email, email_faturado, atividade, cep, logradouro, numero, complemento)
	//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	//     `;

	// 	const values = [comprador, recebedor, cnpj, telefone, celular, email, email_faturado, atividade, cep, logradouro, numero, complemento].map((value) => (value === undefined ? null : value));

	// 	const [result] = await connection.execute(query, values);

	// 	res.status(201).json({ message: 'Cliente cadastrado com sucesso!', clienteId: result.insertId });
	// } catch (error) {
	// 	console.error('Erro ao cadastrar cliente:', error);
	// 	res.status(500).json({ message: 'Erro ao cadastrar cliente.' });
	// }
});

app.listen(port, () => {
	console.log(`Ouvindo a porta ${port}`);
});
