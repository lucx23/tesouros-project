'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('Posts');

    if (!tableDescription.data_nascimento) {
      await queryInterface.addColumn('Posts', 'data_nascimento', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }

    if (!tableDescription.data_falecimento) {
      await queryInterface.addColumn('Posts', 'data_falecimento', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }

    if (!tableDescription.dia_liturgico) {
      await queryInterface.addColumn('Posts', 'dia_liturgico', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    if (!tableDescription.biografia) {
      await queryInterface.addColumn('Posts', 'biografia', {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const tableDescription = await queryInterface.describeTable('Posts');

    if (tableDescription.biografia) {
      await queryInterface.removeColumn('Posts', 'biografia');
    }

    if (tableDescription.dia_liturgico) {
      await queryInterface.removeColumn('Posts', 'dia_liturgico');
    }

    if (tableDescription.data_falecimento) {
      await queryInterface.removeColumn('Posts', 'data_falecimento');
    }

    if (tableDescription.data_nascimento) {
      await queryInterface.removeColumn('Posts', 'data_nascimento');
    }
  },
};