const express = require('express');

const router = express.Router();

router.route('/')
  // route specific middleware
  .all((req, res, next) => {
    console.log('You\'ve reached /columns route.');
    next();
  })
  .get((req, res, next) => {
    res.send('Hello from the /columns route');
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
