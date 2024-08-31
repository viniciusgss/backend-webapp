const express = require('express');
const router = express.Router();
const Usuario = require('/models/Usuario');
const bcrypt = require('bcrypt');

// Cadastro de usuário
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const hashedSenha = await bcrypt.hash(senha, 10);
        const newUsuario = new Usuario({ nome, email, senha: hashedSenha });
        await newUsuario.save();
        res.status(201).json(newUsuario);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao cadastrar usuário', error });
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        res.json({ message: 'Login bem-sucedido', usuarioId: usuario._id });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
});

module.exports = router;
