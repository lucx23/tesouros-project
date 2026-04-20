'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Posts', 'titulo', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Posts', 'descricao', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Posts', 'foto', {
      type: Sequelize.STRING,
      allowNull: false
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Posts', 'titulo', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Posts', 'descricao', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('Posts', 'foto', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
