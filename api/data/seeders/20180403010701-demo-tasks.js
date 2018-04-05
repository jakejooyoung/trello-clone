module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'tasks',
      [
        {
          board_id: 1,
          user_id: 1,
          column_id: 1,
          title: 'Contact PetCo regarding price increase',
          description: '1-800-293-2390 Ext. 4392. Ask for Julie.',
        },
        {
          board_id: 1,
          user_id: 1,
          column_id: 1,
          title: 'Process check payments',
          description: 'Call bank to process checks.',
        },
        {
          board_id: 1,
          user_id: 1,
          column_id: 2,
          title: 'Contact Pet Food Express',
          description: 'Return call for Pet Food Express inquiry.',
        },
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
          column_id: 1,
          title: 'Hire Engineer',
          description: 'Hire an engineer that can get things done',
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
          column_id: 1,
          title: 'Apply for jobs',
          description: 'Find companies with high growth trajectories',
        },
        {
          board_id: 1,
          user_id: 3,
          column_id: 1,
          title: 'Give investor update',
          description: 'Let investor know how things are going.',
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

