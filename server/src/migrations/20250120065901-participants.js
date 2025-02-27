'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Participant', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      chat_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Chat',
          key: 'id'
        }
      },
      role: {
        type: Sequelize.ENUM('admin', 'memeber'),
        defaultValue: 'member'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('Participant');
  }
};
