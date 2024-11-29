import e from 'express';
export const router = e.Router();
import { connection } from '../../connection.js';

router.post('/cadastrar', async (req, res) => {
	const { nome, cnpj, logradouro, numero, complemento, cep, cidade, bairro, comprador_id } = req.body;

	const query = `
   INSERT INTO 
      empresas (nome, cnpj, logradouro, numero, complemento, cep, cidade, bairro, comprador_id)
      VALUES (?,?,?,?,?,?,?,?,?);
   `;

	connection.query(query, [nome, cnpj, logradouro, numero, complemento, cep, cidade, bairro, comprador_id], (err, result) => {
		if (err) {
			console.error('Erro ao inserir no banco de dados:', err);
			return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
		}
		res.status(201).json({ message: 'Empresa cadastrada com sucesso!', id: result.insertId });
	});
});
