const express = require('express')
const router = express.Router()
const models = require('../data/models');

import Sequelize from 'sequelize';
const { Op } = Sequelize;

// route specific middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res,next) {
	// Should be checking auth, if not signed in redirect to signup.
	const asy = async () => {
    const users = await models.User.findAll();
    if (users) {
      res.send(users);
    }
  };
  asy().catch(next);
})

router.param('user_id', function(req, res, next, id) {
  // sample user, would actually get user from DB
  req.user = {
    id: id,
    name: 'Jake'
  };
  next();
});

router.route('/:user_id')
	// route specific middleware
	.all(function(req,res,next){
		console.log(req.user)
		next();
	})
	.get(function(req, res, next) {
	  console.log('GET');
	  res.send('User ID: '+JSON.stringify(req.user));
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



