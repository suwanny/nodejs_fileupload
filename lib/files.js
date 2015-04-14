var express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    Async = require('async'),
    multer = require('multer'),
    fs = require('fs');

router.use(function(req, res, next) {
  console.log('Files: ', req.method, req.url);
  next();
});

router.get('/', function(req, res, next) {
  res.send('Hello files');
});

router.post('/file-upload',[multer({dest: './uploads'}), function(req, res) {

}]);

module.exports = router;
