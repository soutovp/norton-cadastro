import { connection } from '../../connection.js';
export default function getEmpresaCnpj(req, res) {
	const { cnpj } = req.body;

	const query = `
		SELECT id, nome FROM empresas WHERE cnpj = ${cnpj};
	`;

	connection.query(query, (err, results) => {
		if (err) {
			return res.status(500).json({ message: err });
		}
		console.log(results);
		res.status(200).json(results);
	});
}
