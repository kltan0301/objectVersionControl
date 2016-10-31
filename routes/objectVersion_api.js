var express = require('express');
var router = express.Router();
var ObjectVersion = require('../models/objectVersion');

router.route('/search')
  .get(function(req, res) {
    var objectStr = req.query.value;
    var objectArr = objectStr.split(', ').map(function(data){
      return { object_type: data };
    });
    console.log(objectArr);
    ObjectVersion.find({$or:objectArr}, function(err, objectArr){
      if(err) return res.json([]);

      res.json(objectArr);
    });

  });

module.exports = router;
