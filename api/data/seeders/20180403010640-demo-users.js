'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'ethan@mytime.com',
          last_name: 'Anderson',
          first_name: 'Ethan',
        },
        {
          email: 'emanuel@mytime.com',
          last_name: 'Nedelcu',
          first_name: 'Emanuel',
        },
        {
          email: 'jakejooyoung@gmail.com',
          last_name: 'Kim',
          first_name: 'Jake',
        },
      ]),

  down: (queryInterface, Sequelize) => 
    queryInterface.bulkDelete('users', null, {})
};
