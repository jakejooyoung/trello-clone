import Sequelize from 'sequelize';

const { Op } = Sequelize;
const express = require('express');

const router = express.Router({ mergeParams: true });
const models = require('../data/models');

router.get('/', (req, res, next) => {
  // Should be checking auth, if not signed in redirect to signup.
  const parentParam = Object.getOwnPropertyNames(req.params)[0];
  if (!parentParam) {
    res.redirect('/users');
  }
  const asy = async () => {
    const tasks = await models.Task.findAll({
      where: {
        [parentParam]: {
          [Op.eq]: req.params[parentParam],
        },
      },
    });
    if (tasks) {
      res.send(tasks);
    }
  };
  asy().catch(next);
});

router.route('/:taskId')
  // route specific middleware
  .all((req, res, next) => {
    const asy = async () => {
      const task = await models.Task.findAll({
        where: {
          id: {
            [Op.eq]: req.params.taskId,
          },
        },
      });
      if (task) {
        res.send(task);
      }
    };
    asy().catch(next);
  })
  .get((req, res, next) => {
    res.send('Hello from the /tasks route');
  })
  .put((req, res, next) => {
    next(new Error('not implemented'));
  })
  .post((req, res, next) => {
    next(new Error('not implemented'));
  })
  .delete((req, res, next) => {
    next(new Error('not implemented'));
  });

module.exports = router;
