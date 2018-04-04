import Sequelize from 'sequelize';

const { Op } = Sequelize;
const express = require('express');

const router = express.Router();
const models = require('../data/models');

router.get('/', (req, res, next) => {
  // Should be checking auth, if not signed in redirect to signup.
  const asy = async () => {
    const users = await models.User.findAll();
    if (users) {
      res.send(users);
    }
  };
  asy().catch(next);
});

router.route('/:userId')
// route specific middleware
  .all((req, res, next) => {
    const asy = async () => {
      const user = await models.User.findAll({
        where: {
          id: {
            [Op.eq]: req.params.userId,
          },
        },
      });
      if (user) {
        res.send(user);
      }
    };
    asy().catch(next);
  })
  .get((req, res, next) => {
    res.send(`User ID: ${JSON.stringify(req.user)}`);
    next();
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

router.use('/:userId/boards', require('./boards'));
router.use('/:userId/columns', require('./columns'));
router.use('/:userId/tasks', require('./tasks'));

module.exports = router;

