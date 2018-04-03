const express = require('express');

const router = express.Router();
const models = require('../data/models');

import Sequelize from 'sequelize';

const { Op } = Sequelize;

// route specific middleware
router.use((req, res, next) => {
  next();
});

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

router.param('user_id', (req, res, next, id) => {
  // sample user, would actually get user from DB
  req.user = {
    id,
    name: 'Jake',
  };
  next();
});

router.route('/:user_id')
// route specific middleware
  .all((req, res, next) => {
    next();
  })
  .get((req, res, next) => {
	  res.send(`User ID: ${JSON.stringify(req.user)}`);
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

