'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('game_room', [
      {
        room_id: uuidv4(),
        name: 'room001',
        player1_id: '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
        player2_id: '6dcb3b28-d798-4cec-80b5-516bfe18c25b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        room_id: uuidv4(),
        name: 'room002',
        player1_id: '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
        player2_id: '7bbe267d-e1aa-41d5-9a48-50e74fc04400',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('game_room', null, {});
  }
};
