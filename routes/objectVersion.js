var express = require('express');
var router = express.Router();
var ObjectVersion = require('../models/objectVersion');
var StrConverter = require('../models/objectArrConverter');

router.route('/')
  .get(function(req, res) {
    res.render('objectVersion/search');
  });

router.route('/upload')
  .get(function(req, res) {
    res.render('objectVersion/index');
  })
  .post(function(req, res) {
    var fileData = req.files.versionFile.data.toString('utf8').split(/[\n]+/);
    var objStrConverter = new StrConverter(fileData);
    var objVersionArr = objStrConverter.generateObjectArray();
    var counter = objVersionArr.length;

    objVersionArr.forEach(function(objVersion) {
      ObjectVersion.findOne({
        object_type: objVersion.object_type
      }, function(err, foundObject) {
        console.log(foundObject, objVersion.object_type);
        if (foundObject) {
          if (objVersion.timestamp > foundObject.timestamp) {
            ObjectVersion.update({
              object_type: objVersion.object_type
            }, objVersion, {
              upsert: true
            }, function(err, object) {
              if (err) throw new Error(err);
            });
          }
        } else {
          ObjectVersion.create(objVersion, function(err, object) {
            if (err) throw new Error(err);
          });
        }
      });
      if (counter === 1) {
        res.send("done!");
      } else {
        counter--;
      }
    });
  });

module.exports = router;
