var express = require('express');
var router = express.Router();
var ObjectVersion = require('../models/objectVersion');
var StrConverter = require('../models/objectArrConverter');

router.route('/')
      .get(function(req,res){
        res.render('objectVersion/index');
      });

router.route('/search')
  .get(function(req, res) {
    res.render('objectVersion/search');
  });

router.route('/upload')
  .get(function(req, res) {
    res.render('objectVersion/csvUpload');
  })
  .post(function(req, res) {
    var fileData = req.files.versionFile.data.toString('utf8').split(/[\n]+/);
    var objStrConverter = new StrConverter(fileData);
    var objVersionArr = objStrConverter.convertStringToObjArr();

    var counter = objVersionArr.length;
    //loop through csv, overwrite changes if same document but different changes found
    objVersionArr.forEach(function(objVersion) {
      ObjectVersion.findOne({
        object_type: objVersion.object_type,
        timestamp: objVersion.timestamp
      }, function(err, foundObject) {
        if (foundObject) {
          if(foundObject.object_changes !== objVersion.object_changes){
            console.log("overwrite");
            ObjectVersion.update(foundObject, objVersion, {
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
        res.redirect('/upload');
      } else {
        counter--;
      }
    });
  });

module.exports = router;
