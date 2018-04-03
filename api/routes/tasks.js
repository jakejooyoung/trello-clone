const express = require('express')
const router = express.Router()
const models = require('../data/models');

import Sequelize from 'sequelize';
const { Op } = Sequelize;

router.get('/', function (req, res,next) {
  // Should be checking auth, if not signed in redirect to signup.
  const asy = async () => {
    const tasks = await models.Task.findAll();
    if (tasks) {
      res.send(tasks);
    }
  };
  asy().catch(next);
})

router.route('/')
  // route specific middleware
  .all(function(req,res,next){
    console.log('You\'ve reached /tasks route.');
    next();
  })
  .get(function(req, res, next) {
    res.send('Hello from the /tasks route');
  })
  .put(function(req, res, next) {
    next(new Error('not implemented'));
  })
  .post(function(req, res, next) {
    next(new Error('not implemented'));
  })
  .delete(function(req, res, next) {
    next(new Error('not implemented'));
  });
  
module.exports = router;