const express = require('express')
const router = express.Router()

router.route('/')
  // route specific middleware
  .all(function(req,res,next){
    console.log("You've reached /boards route.");
    next();
  })
  .get(function(req, res, next) {
    res.send("Hello from the /boards route");
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