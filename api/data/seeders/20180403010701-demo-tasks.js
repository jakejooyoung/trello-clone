module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'tasks',
      [
        {
          board_id: 1,
          user_id: 1,
          column_id: 1,
          title: 'Sales',
          description: 'MyTime\'s task management board.',
        },
        {
          board_id: 1,
          user_id: 1,
          column_id: 1,
          title: 'Product Development',
          description: 'MyTime\'s task management board.',
        },
        {
          board_id: 2,
          user_id: 2,
          column_id: 1,
          title: 'Sales',
          description: 'Emanuel\'s task management board.',
        },
        {
          board_id: 3,
          user_id: 3,
          column_id: 1,
          title: 'Cashew Pay Tasks',
          description: 'CashewPay\'s task management board.',
        },
        {
          user_id: 3,
          board_id: 2,
          column_id: 2,
          title: 'Jake\'s Personal Task List',
          description: 'My personal task list!',
        },
      ],
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('tasks', null, {}),
};

