//Elements
mailContato = document.getElementById('mailContato');
mailContato_check = document.getElementById('mailContato-check');
let inicial;
//Constants Publicas
const check = {
	yes: {
		url: '/static/images/check.svg',
		alt: 'Dados validados e disponíveis para inserir no banco de dados',
	},
	no: {
		url: '/static/images/no-check.svg',
		alt: 'Este campo já contém dados existentes no banco de dados',
	},
	invalid: {
		url: '/static/images/no-check.svg',
		alt: 'Formato de e-mail inválido.',
	},
};

// Event Listeners
mailContato.addEventListener('input', async (e) => {
	clearTimeout(inicial);
	const email = e.target.value.trim();
	mailContato_check.innerHTML = '';

	if (email === '') return;

	if (!validarEmail(email)) {
		const img = document.createElement('img');
		img.src = check.invalid.url;
		img.alt = check.invalid.alt;
		mailContato_check.appendChild(img);
		return;
	}
	inicial = setTimeout(() => verificarEmailServidor({ email: email }), 1000);
});
const verificarEmailServidor = async (data) => {
	try {
		const response = await fetch('/api/compradores/load/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const result = await response.json();
			const img = document.createElement('img');

			if (result.result.length > 0) {
				img.src = check.no.url;
				img.alt = check.no.alt;
			} else {
				img.src = check.yes.url;
				img.alt = check.yes.alt;
			}
			mailContato_check.appendChild(img);
		}
	} catch (err) {
		console.error(err);
	}
};

// ---------------------------------------

// Função para validar estrutura do e-mail
function validarEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para e-mail
	return regex.test(email);
}
