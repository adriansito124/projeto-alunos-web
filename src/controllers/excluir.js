const sala = require('../model/sala');
const aluno = require('../model/aluno');
const fs = require('fs');
const { where } = require('sequelize');


module.exports = {


    async alunos(req, res) {
        // Recebendo o id da URL
        const parametro = req.params.id;

        const alunos = await aluno.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
        });

        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });

        res.render('../views/excluirAluno', { salas, alunos });
    },


    async deletarAluno(req, res) {

        const id = req.params.id;

        await aluno.destroy({
            where: { IDAluno: id }
        });

        res.redirect('/');

    },

    async salas(req, res) {
        // Recebendo o id da URL
        const parametro = req.params.id;

        const alunos = await aluno.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala']
        });

        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });

        res.render('../views/excluirSala', { salas, alunos });
    },


    async deletarSala(req, res) {

        const id = req.params.id;

        const qtdAlunos = await aluno.count({
            where: { IDSala: id }
        });

        if (qtdAlunos > 0) {
            console.log("impossivel");
        }
        else {
            await sala.destroy({
                where: { IDSala: id }
            });
        }

        res.redirect('/');

    }
}