const express = require('express');

const router = express.Router();
const models = require('../data/models');

import Sequelize from 'sequelize';

const { Op } = Sequelize;

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res, next) => {
  // Should be checking auth, if not signed in redirect to signup.
  const asy = async () => {
    const boards = await models.Board.findAll();
    if (boards) {
      res.send(boards);
    }
  };
  asy().catch(next);
});

router.param('boardId', (req, res, next) => {
  next();
});

router.route('/:boardId')
  // route specific middleware
  .all((req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    console.log(req.params.boardId);
    const asy = async () => {
      const board = await models.Board.findAll({
        where: {
          id: {
            [Op.eq]: req.params.boardId,
          },
        },
      });
      if (board) {
        res.send(board);
      }
    };
    asy().catch(next);
  })
  .put((req, res, next) => {
    next(new Error('not implemented'));
  })
  .post((req, res, next) => {
    models.Board.create(req.body).then((board) => {
      res.send(board);
    });
  })
  .delete((req, res, next) => {
    next(new Error('not implemented'));
  });

module.exports = router;
