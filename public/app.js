document.getElementById('pessoaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;

    try {
        const response = await fetch('/pessoas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, cpf, telefone }),
        });

        if (response.ok) {
            alert('Pessoa cadastrada com sucesso!');
            listarPessoas(); // Atualiza a lista
        } else {
            alert('Erro ao cadastrar pessoa.');
        }
    } catch (error) {
        alert('Erro de conexão.');
    }
});

async function listarPessoas() {
    try {
        const response = await fetch('/pessoas');
        const pessoas = await response.json();

        const pessoasList = document.getElementById('pessoasList');
        pessoasList.innerHTML = '';

        pessoas.forEach(pessoa => {
            const li = document.createElement('li');
            li.textContent = `${pessoa.nome} - CPF: ${pessoa.cpf} - Telefone: ${pessoa.telefone}`;
            pessoasList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar pessoas:', error);
    }
}

listarPessoas();
