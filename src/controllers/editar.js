const sala = require('../model/sala');
const aluno = require('../model/aluno');
const fs = require('fs');

module.exports = {

    async alunos(req, res) {
        // Recebendo o id da URL
        const parametro = req.params.id;

        const alunos = await aluno.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDAluno', 'Nome', 'Idade', 'Sexo', 'Foto', 'IDSala', 'Birth']
        });

        const salas = await sala.findAll({ raw: true, attributes: ['IDSala', 'Nome'] });

        console.log(alunos.Birth)

        res.render('../views/editarAluno', { salas, alunos });
    },

    async alunoEditar(req, res) {

        const dados = req.body;

        const id = req.params.id;
        // Dando upgrade nas novas informações

        const today = new Date();

        const nascimento = new Date(dados.idade);

        let age = today.getFullYear() - nascimento.getFullYear();

        if (dados.idade) {
            await aluno.update({
                Nome: dados.nome,
                Idade: age,
                Sexo: dados.sexo,
                Birth: dados.idade,
                IDSala: dados.sala
            },
                {
                    where: { IDAluno: id }
                },
            )
            // Se foi enviado alguma foto
            if (req.file) {
                // Recebendo a antiga foto do aluno
                const antigaFoto = await aluno.findAll({
                    raw: true,
                    attributes: ['Foto'],
                    where: { IDAluno: id }
                });
                // Excluindo a foto da pasta
                if (antigaFoto[0].Foto != 'user.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, (err => { if (err) console.log(err); }));
                // Update da nova foto no DB
                await aluno.update(
                    { Foto: req.file.filename },
                    { where: { IDAluno: id } }
                );
            };
        }
        else {
            await aluno.update({
                Nome: dados.nome,
                Sexo: dados.sexo,
                IDSala: dados.sala
            },
                {
                    where: { IDAluno: id }
                },
            )
            // Se foi enviado alguma foto
            if (req.file) {
                // Recebendo a antiga foto do aluno
                const antigaFoto = await aluno.findAll({
                    raw: true,
                    attributes: ['Foto'],
                    where: { IDAluno: id }
                });
                // Excluindo a foto da pasta
                if (antigaFoto[0].Foto != 'user.png') fs.unlink(`public/img/${antigaFoto[0].Foto}`, (err => { if (err) console.log(err); }));
                // Update da nova foto no DB
                await aluno.update(
                    { Foto: req.file.filename },
                    { where: { IDAluno: id } }
                );
            };
        }

        res.redirect('/');
    },

    async sala(req, res) {
        const parametro = req.params.id;

        const salas = await sala.findByPk(parametro, {
            raw: true, //Retorna os somente os valores de uma tabela, sem os metadados
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });

        res.render('../views/editarSala', { salas });
    },

    async salaEditar(req, res) {

        const dados = req.body;

        const id = req.params.id;
        // Dando upgrade nas novas informações

        const qtdAlunos = await aluno.count({
            where: { IDSala: id }
        });

        if (qtdAlunos > dados.capacidade) {
            console.log("impossivel");
        }
        else {
            await sala.update({
                Nome: dados.nome,
                Capacidade: dados.capacidade,
            },
                {
                    where: { IDSala: id }
                },
            )
        }

        res.redirect('/');

    }
}