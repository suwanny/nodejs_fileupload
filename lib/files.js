var express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    Async = require('async');

router.use(function(req, res, next) {
  console.log('Files: ', req.method, req.url);
  next();
});

router.get('/', function(req, res, next) {
  res.json({
    ok: true,
    data: []
  });
});

module.exports = router;
