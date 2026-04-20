'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'data_nascimento', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Posts', 'data_falecimento', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Posts', 'dia_liturgico', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Posts', 'biografia', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'data_nascimento');
    await queryInterface.removeColumn('Posts', 'data_falecimento');
    await queryInterface.removeColumn('Posts', 'dia_liturgico');
    await queryInterface.removeColumn('Posts', 'biografia');
  }
};
