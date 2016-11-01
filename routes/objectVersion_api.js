var express = require('express');
var router = express.Router();
var ObjectVersion = require('../models/objectVersion');

function convertStringToJSON(objString){
  return JSON.parse(objString.replace(/([a-zA-Z0-9_]+)?:/g, '"$1":'));
}
router.route('/search')
  .get(function(req, res) {
    var queryStr = req.query;

    ObjectVersion.find({
      $and: [{
        object_type: queryStr.object_type
      }, {
        timestamp: {
          $lte: new Date(queryStr.timestamp)
        }
      }]
    }).sort({
      timestamp: 'desc'
    }).exec(function(err, versionArr) {

      var obj = {};
      if(versionArr){
        versionArr.forEach(function(data){
          var objChanges = convertStringToJSON(data.object_changes);
          for(var key in objChanges){
            if(!obj[key]){
              obj[key] = objChanges[key];
            }
          }
        });
        res.json(obj);
      }else{
        res.json(null);
      }

    });


  });

module.exports = router;
