module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'boards',
      [
        {
          user_id: 1,
          title: 'MyTime Tasks',
          description: 'MyTime\'s task management board.',
        },
        {
          user_id: 2,
          title: 'Emanuel\'s Tasks',
          description: 'Emanuel\'s task management board.',
        },
        {
          user_id: 3,
          title: 'Cashew Pay Tasks',
          description: 'CashewPay\'s task management board.',
        },
        {
          user_id: 3,
          title: 'Jake\'s Personal Task List',
          description: 'My personal task list!',
        },
      ],
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('boards', null, {}),
};
