// Importação
const Sequelize = require('sequelize');
const database = require('../config/db');

// Criando a tabela Sala

const aluno = database.define('Aluno', {

    IDAluno: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    Idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Sexo: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    Foto: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    Birth: {
        type: Sequelize.DATE,
        allowNull: false
    }
});
// Exportando essa tabela

const sala = require('./sala');

aluno.belongsTo(sala, {
    constraint: true,
    foreignKey: 'IDSala'
})

module.exports = aluno;