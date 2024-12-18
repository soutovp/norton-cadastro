const form_cadastro_comprador = document.getElementById('form_cadastro_comprador');
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
			console.log('Sucesso:', result);
			alert('Cadastro realizado com sucesso!');
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
		const response = await fetch('http://127.0.0.1/api/delete/comprador', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: select.value }),
		});
		if (response.ok) {
			const result = await response.json();
			console.log('Sucesso:', result);
			alert('Comprador deletado com sucesso!');
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

const updateCompradores = async () => {
	fetch('http://127.0.0.1/api/comprador')
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			const compradores = JSON.parse(json);
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
};
updateCompradores();
