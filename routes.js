// Iniciando Route do Express

const express = require('express');
const route = express.Router();

// Importando os Controllers

const home = require('./src/controllers/home');

// Iniciando as rotas

route.get('/', home.pagInicialGet);
route.post('/', home.pagInicialPost);

const cadastro = require('./src/controllers/cadastro');

const editar = require('./src/controllers/editar');

const excluir = require('./src/controllers/excluir')

route.get('/cadastro_sala', cadastro.sala);
route.post('/cadastro_sala', cadastro.salaInsert);

// Iniciando Multer
const multer = require("multer");
// Recebendo arquivo do multer que criamos
const config = require('./src/config/multer');
// Cadastro de aluno irá receber um arquivo com o "name" do HTML chamado de "foto"

route.get('/cadastro_aluno', cadastro.aluno);
route.post('/cadastro_aluno', multer(config).single('foto'), cadastro.alunoInsert);

route.get('/editarAluno/:id', editar.alunos);
route.post('/editarAluno/:id', multer(config).single('foto'), editar.alunoEditar);

route.get('/editarSala/:id', editar.sala);
route.post('/editarSala/:id', editar.salaEditar);

route.get('/excluirAluno/:id', excluir.alunos);
route.post('/excluirAluno/:id', multer(config).single('foto'), excluir.deletarAluno);

route.get('/excluirSala/:id', excluir.salas);
route.post('/excluirSala/:id', excluir.deletarSala);

module.exports = route;