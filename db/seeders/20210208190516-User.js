'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_game', [
      {
        id: 'd649bb89-0e21-4fdc-ad4e-e19f78c59f07',
        username: 'admin',
        email: 'admin@rfadhil.com',
        password: bcrypt.hashSync('admin', 10),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'e7516524-7b5c-11eb-9439-0242ac130002',
        username: 'binar',
        email: 'binar@binar.co.id',
        password: bcrypt.hashSync('binar', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '06896bd4-8cbc-48c6-8c46-9364a6d939c4',
        username: 'rfadhil',
        email: 'ridhanfadhilah@gmail.com',
        password: bcrypt.hashSync('passwordpalingsusah', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6dcb3b28-d798-4cec-80b5-516bfe18c25b',
        username: 'vkurniawan',
        email: 'vkurniawan@binar.co.id',
        password: bcrypt.hashSync('12345678', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7bbe267d-e1aa-41d5-9a48-50e74fc04400',
        username: 'sabrina',
        email: 'sabrina@binar.co.id',
        password: bcrypt.hashSync('sabrina', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_game', null, {});
  }
};

