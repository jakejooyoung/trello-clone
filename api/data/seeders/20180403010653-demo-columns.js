'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert(
      'columns',
      [
        {
          board_id: 1,
          user_id:1,
          title: "Contact PetCo",
          description: "Contact PetCo regarding price increase."
        },
        {
          board_id: 1,
          user_id:2,
          title: "Contact Pet Food Express",
          description: "Return call for Pet Food Express inquiry."
        },
        {
          board_id: 1,
          user_id:2,
          title: "Hire Engineer",
          description: "Hire an engineer that can get things done"
        },
        {
          board_id: 4,
          user_id:3,
          title: "Coding Challenge",
          description: "Code a Trello Mockup."
        },
        {
          board_id: 4,
          user_id:3,
          title: "Apply for jobs",
          description: "Find companies with high growth trajectories"
        },
      ]),

  down: (queryInterface, Sequelize) => 
    queryInterface.bulkDelete('columns', null, {})
};
