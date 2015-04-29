var express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    Async = require('async'),
    fs = require('fs'),
    AWS = require('aws-sdk'),
    multiparty = require('multiparty');

AWS.config.loadFromPath('./s3Key/key.json');
var s3Client = new AWS.S3();

s3Client.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});

// s3Client.listObjects({Bucket: "avnext-development1"}, function(err, data) {
//   console.log(data);
// });

router.use(function(req, res, next) {
  console.log('Files: ', req.method, req.url);
  next();
});

router.get('/', function(req, res, next) {
  res.send('Hello files');
});

router.post('/file-upload', function(req, res) {
  var form = new multiparty.Form();
  var bucket = "avnext-development1";
  form.on('part', function(part) {
    var filename = part.filename;
    s3Client.putObject({
      Bucket: bucket,
      Key: filename,
      ACL: 'public-read',
      Body: part,
      ContentLength: part.byteCount,
    }, function(err, data) {
      if (err) throw err;
      console.log("done", data);
      res.end("OK");
      console.log("https://s3.amazonaws.com/" + bucket + '/' + filename);
    });
  });
  form.parse(req);
})

module.exports = router;
