var express = require('express');
var router = express.Router();
var ObjectVersion = require('../models/objectVersion');

function convertStringToJSON(objString){
  return JSON.parse(objString.replace(/([a-zA-Z0-9_]+)?:/g, '"$1":'));
}
router.route('/search')
  .get(function(req, res) {
    var queryStr = req.query;

    // ObjectVersion.find({$and:[{object_type:objectStr.object_type},{timestamp:{$lte:new Date(objectStr.timestamp)}}]}, function(err, objectArr){
    //
    //   if(err) return res.json([]);
    //
    //   res.json(objectArr);
    // });
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
      // var resultArr = [];
      var obj = {};

      versionArr.forEach(function(data){
        var objChanges = convertStringToJSON(data.object_changes);
        console.log("data: " + data);
        for(var key in objChanges){
          console.log(key);
          if(obj[key]){
            console.log(obj[key]);
          }else{
            console.log("key not found");
            obj[key] = objChanges[key];
          }
        }
      });
      console.log("object is: " + JSON.stringify(obj));
      res.json(obj);
    });


  });

module.exports = router;
