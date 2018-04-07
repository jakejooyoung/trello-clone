import Sequelize from 'sequelize';

const { Op } = Sequelize;
const express = require('express');

const router = express.Router({ mergeParams: true });
const models = require('../data/models');

router.route('/')
  .get((req, res, next) => {
    // Should be checking auth, if not signed in redirect to signup.
    const parentParam = Object.getOwnPropertyNames(req.params)[0];
    // if (!parentParam) {
    //   res.redirect('/users');
    // }
    const asy = async () => {
      const boards = await models.Board.findAll({
        where: {
          [parentParam]: {
            [Op.eq]: req.params[parentParam],
          },
        },
      });
      if (boards) {
        res.json(boards);
      }
    };
    asy().catch(next);
  })
  .post((req, res, next) => {
    models.Board.create(req.body).then((board) => {
      if (board) {
        res.json(board);
      }
    });
  })

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
  .delete((req, res, next) => {
    next(new Error('not implemented'));
  });

router.use('/:boardId/columns', require('./columns'));
router.use('/:boardId/tasks', require('./tasks'));

module.exports = router;
