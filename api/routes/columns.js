import Sequelize from 'sequelize';

const { Op } = Sequelize;
const express = require('express');

const router = express.Router({ mergeParams: true });
const models = require('../data/models');

router.route('/')
  .get((req, res, next) => {
    const parentParam = Object.getOwnPropertyNames(req.params)[0];
    if (!parentParam) {
      res.redirect('/users');
    }
    const asy = async () => {
      const columns = await models.Column.findAll({
        where: {
          [parentParam]: {
            [Op.eq]: req.params[parentParam],
          },
        },
      });
      if (columns) {
        res.send(columns);
      }
    };
    asy().catch(next);
  })
  .post((req, res, next) =>{
    models.Column.create(req.body).then((column) => {
      if (column) {
        res.json(column);
      }
    });
  })
router.route('/:columnId')
  // route specific middleware
  .all((req, res, next) => {
    next();
  })
  .get((req, res, next) => {
    const asy = async () => {
      const column = await models.Column.findAll({
        where: {
          id: {
            [Op.eq]: req.params.columnId,
          },
        },
      });
      if (column) {
        res.send(column);
      }
    };
    asy().catch(next);
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

router.use('/:columnId/tasks', require('./tasks'));

module.exports = router;
