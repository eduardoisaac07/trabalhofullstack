const express = require('express');
const { Pessoa } = require('./models'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); 

app.post('/pessoas', async (req, res) => {
    const { nome, cpf, telefone } = req.body;

    try {
        const novaPessoa = await Pessoa.create({ nome, cpf, telefone });
        res.status(201).json(novaPessoa);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao salvar pessoa.' });
    }
});

app.get('/pessoas', async (req, res) => {
    try {
        const pessoas = await Pessoa.findAll();
        res.status(200).json(pessoas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pessoas.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
