'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('posts', 'titulo', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('posts', 'descricao', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('posts', 'foto', {
      type: Sequelize.STRING,
      allowNull: false
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('posts', 'titulo', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('posts', 'descricao', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('posts', 'foto', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
