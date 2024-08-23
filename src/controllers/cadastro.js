const sala = require('../model/sala');
const aluno = require('../model/aluno');

module.exports = {
    async sala(req, res) {
        res.render('../views/cadastro_sala');
    },

    async salaInsert(req, res) {

        // Recebe as informações do front-end
        const dados = req.body;

        // Criando sala no banco de dados
        await sala.create({
            Nome: dados.nome,
            Capacidade: dados.capacidade,
            Min: dados.min,
            Max: dados.max
        });

        // Redirecionar para a página principal
        res.redirect('/');

    },


    async aluno(req, res) {


        // Encontrando todas as salas disponíveis no SQL

        const salas = await sala.findAll({
            raw: true,
            attributes: ['IDSala', 'Nome', 'Capacidade']
        });

        // função que apeia o array de salas adicionando um novo atributo à cada elemento do vetor


        const salasContador = await Promise.all(salas.map(async (sala) => {
            const qtdAlunos = await aluno.count({ where: { IDSala: sala.IDSala } })

            // spread opperator 
            return { ...sala, qtdAlunos }
        }));

        res.render('../views/cadastro_aluno', { salas: salasContador });
    },

    async alunoInsert(req, res) {

        // Recebe as informações do front-end
        const dados = req.body;

        let foto = 'user.png';
        // Verificando se foi enviada alguma foto
        if (req.file) {
            // Pegar novo nome da foto
            foto = req.file.filename;
        }


        const today = new Date();

        const nascimento = new Date(dados.idade);

        let age = today.getFullYear() - nascimento.getFullYear();

        // Criando sala no banco de dados
        await aluno.create({
            Nome: dados.nome,
            Idade: age,
            Sexo: dados.sexo,
            Foto: foto,
            Birth: dados.idade,
            IDSala: dados.sala
        });

        // Redirecionar para a página principal
        res.redirect('/');

    }
}

