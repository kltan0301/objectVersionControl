var express = require('express');
var router = express.Router();
var ObjectVersion = require('../models/objectVersion');

function convertCSVToArr(fileStr) {
  var objVersionArr = [];
  //remove header
  fileStr.splice(0,1);
  //remove last element
  fileStr.splice(fileStr.length-1,1);

  return fileStr.map(function(data){
    var newObject = {};
    var rowData = data.split(",");
    newObject.object_type = rowData[1];
    newObject.timestamp = new Date(parseInt(rowData[2])*1000);

    if(rowData.length > 4){
      var objChangesStr = "";
      for(var i = 3; i < rowData.length; i++){
        i !== rowData.length-1 ? objChangesStr += rowData[i] + "," : objChangesStr += rowData[i];
      }
      newObject.object_changes = objChangesStr;
    } else {
      newObject.object_changes = rowData[3];
    }
    return newObject;
  });
}

function getUniqueObjectArr( versionArr ) {

  var finalArr = [];
  var uniqueVals = {};

  versionArr.forEach(function(obj){
    if(uniqueVals[obj.object_type]){
      if(obj.timestamp > uniqueVals[obj.object_type].timestamp){
        uniqueVals[obj.object_type] = obj;
      }
    }else{
      uniqueVals[obj.object_type] = obj;
    }
  });

  for(var val in uniqueVals){
    finalArr.push(uniqueVals[val]);
  }
  return finalArr;
}

router.route('/upload')
      .get(function(req, res){
        res.render('objectVersion/index');
      })
      .post(function(req, res){
        var fileData = req.files.versionFile.data.toString('utf8').split(/[\n]+/);
        var objVersionArr = convertCSVToArr(fileData);
        console.log(getUniqueObjectArr(objVersionArr));
        // var counter = objVersionArr.length;

        // objVersionArr.forEach(function(objVersion){
        //   ObjectVersion.findOne({object_type: objVersion.object_type}, function(err, foundObject){
        //     console.log(foundObject, objVersion.object_type);
        //     if(foundObject){
        //       if(objVersion.timestamp > foundObject.timestamp){
        //         ObjectVersion.update({object_type: objVersion.object_type}, objVersion , {upsert: true}, function(err, object){
        //           if(err) throw new Error(err);
        //         });
        //       }
        //     }else{
        //       ObjectVersion.create(objVersion, function(err, object){
        //         if(err) throw new Error(err);
        //       });
        //     }
        //   });
        //   if(counter === 1){
        //     res.send("done!");
        //   }else{
        //     counter--;
        //   }
        // });
      });

module.exports = router;
