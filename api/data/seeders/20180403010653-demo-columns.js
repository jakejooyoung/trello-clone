module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'columns',
      [
        {
          board_id: 1,
          user_id: 1,
          title: 'DevOps',
          description: 'Description of DevOps',
        },
        {
          board_id: 1,
          user_id: 1,
          title: 'Business',
          description: 'Description of Business',
        },
        {
          board_id: 1,
          user_id: 2,
          title: 'Pet Food',
          description: 'Description of Pet Food.',
        },
        {
          board_id: 1,
          user_id: 2,
          title: 'Hiring',
          description: 'Description of Hiring',
        },
        {
          board_id: 4,
          user_id: 3,
          title: 'Coding',
          description: 'Description of Coding Project',
        },
        {
          board_id: 4,
          user_id: 3,
          title: 'Apply for jobs',
          description: 'Description of job search.',
        },
      ],
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('columns', null, {}),
};
