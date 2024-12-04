const form_cadastro_comprador = document.getElementById('form_cadastro_comprador');
async function updateCompradores() {
	fetch('/api/compradores/get/comprador')
		.then((data) => {
			return data.json();
		})
		.then((compradores) => {
			const elementoCompradores = document.getElementById('comprador');
			elementoCompradores.innerHTML = '';
			for (comp in compradores) {
				const opt = document.createElement('option');
				opt.innerText = compradores[comp].comprador;
				opt.value = compradores[comp].id;
				elementoCompradores.appendChild(opt);
			}
		})
		.catch((err) => {
			console.error(err);
		});
}
updateCompradores();
const submitForm = async () => {
	const nome_comprador = document.getElementById('nome_comprador');
	const mail_comprador_contato = document.getElementById('mail_comprador_contato');
	const mail_comprador_faturamento = document.getElementById('mail_comprador_faturamento');

	const data = {
		nome_comprador: nome_comprador.value,
		mail_comprador_contato: mail_comprador_contato.value,
		mail_comprador_faturamento: mail_comprador_faturamento.value,
	};

	try {
		const response = await fetch('http://127.0.0.1/cadastros/comprador', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const result = await response.json();
			const resultCadastro = document.getElementById('resultCadastro');
			resultCadastro.innerText = result.message;
			resultCadastro.style.color = `green`;

			await updateCompradores();
		} else {
			const error = await response.json();
			console.error('Erro ao inserir:', error);
			alert('Erro ao inserir os dados');
		}
	} catch (error) {
		console.error('Erro na requisição:', error);
	}
};

form_cadastro_comprador.addEventListener('submit', async (e) => {
	e.preventDefault();
	await submitForm();
});

const deleteComprador = async () => {
	const select = document.getElementById('comprador');
	try {
		const response = await fetch('/api/compradores/delete/comprador', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: select.value,
			}),
		});
		if (response.ok) {
			updateCompradores();
			const result = await response.json();
			const resultCompradores = document.getElementById('resultCompradores');
			resultCompradores.innerText = result.message;
			resultCompradores.style.color = 'green';
			updateTable();
		} else {
			const error = await response.json();
			console.error('Erro ao inserir:', error);
			alert('Erro ao inserir os dados');
		}
	} catch (error) {
		console.error('Erro na requisição:', error);
	}
};

const updateTable = (data) => {
	const table = document.getElementById('table_compradores');
	table.innerHTML = `
      <tr>
        <td>Comprador</td>
        <td>E-mail</td>
        <td>E-mail Faturamento</td>
      </tr>
    `;
	if (data.result) {
		for (dados in data.result) {
			const tr = document.createElement('tr');
			const comprador = document.createElement('td');
			const email = document.createElement('td');
			const email_faturamento = document.createElement('td');
			comprador.innerText = data.result[dados].comprador;
			email.innerText = data.result[dados].email;
			email_faturamento.innerText = data.result[dados].email_faturamento;
			tr.appendChild(comprador);
			tr.appendChild(email);
			tr.appendChild(email_faturamento);
			table.appendChild(tr);
		}
	}
};
const carregarComprador = async () => {
	const select = document.getElementById('comprador');
	try {
		const response = await fetch('/api/compradores/load/comprador', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: select.value,
			}),
		});
		if (response.ok) {
			const result = await response.json();
			updateTable(result);
		} else {
			const error = await response.json();
			console.error('Erro ao inserir:', error);
			alert('Erro ao inserir os dados');
		}
	} catch (error) {
		console.error('Erro na requisição:', error);
	}
};
