'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('User', 
      { 
        id: {
          type: Sequelize.UUID, 
          primaryKey: true, 
          allowNull: false
        }, 
        name: Sequelize.STRING, 
        email: {
          type: Sequelize.STRING,
          allowNull: false, 
          unique: true
        }, 
        password: {
          type: Sequelize.STRING,
          allowNull: false
        }, 
        status: {
          type: Sequelize.ENUM('online', 'offline'), 
          defaultValue: 'online'
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
