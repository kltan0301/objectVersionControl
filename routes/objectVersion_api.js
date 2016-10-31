var express = require('express');


router.route('/search')
  .get(function(req, res) {
    res.render('objectVersion/search', {
      result: null
    });
  });
