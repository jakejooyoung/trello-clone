module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'tasks',
      [
        {
          board_id: 2,
          user_id: 1,
          column_id: 1,
          title: 'Contact Accountant',
          description: 'Ask accountant to file taxes.',
        },
        {
          board_id: 2,
          user_id: 1,
          column_id: 1,
          title: 'Contact credit card company',
          description: 'Dispute transaction.',
        },
        {
          board_id: 1,
          user_id: 2,
          column_id: 1,
          title: 'Contact Pet Food Express',
          description: 'Return call for Pet Food Express inquiry.',
        },
        {
          board_id: 1,
          user_id: 2,
          column_id: 2,
          title: 'Coding Challenge',
          description: 'Code a Trello Mockup.',
        },
        {
          board_id: 1,
          user_id: 3,
          column_id: 2,
          title: 'Call lawyer',
          description: 'Inquire about case.',
        },
        {
          board_id: 3,
          user_id: 3,
          column_id: 2,
          title: 'Refactor JS',
          description: 'Componentalize and write DRY code!',
        },
        {
          board_id: 2,
          user_id: 3,
          column_id: 1,
          title: 'CSS ',
          description: 'Fix css errors.',
        },
        {
          user_id: 2,
          board_id: 2,
          column_id: 1,
          title: 'Call bank',
          description: 'Call bank to inquire about pending transfer.',
        },
      ],
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('tasks', null, {}),
};

