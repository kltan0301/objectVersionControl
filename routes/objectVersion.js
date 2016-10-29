var express = require('express');
var router = express.Router();

router.route('/upload')
      .get(function(req, res){
        res.render('objectVersion/index');
      })
      .post(function(req, res){
        var fileData = req.files.versionFile.data.toString('utf8').split(/[\n,]+/);
        res.send(fileData);
      })

module.exports = router;
