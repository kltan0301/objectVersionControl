var ObjectArrConverter = function(fileArr){
  this.fileArr = fileArr;

  var convertStringToObjArr = function(){
    var objVersionArr = [];
    //remove header
    this.fileArr.splice(0,1);
    //remove last element
    this.fileArr.splice(fileArr.length-1,1);

    return this.fileArr.map(function(data){
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
  };

  var getUniqueObjectArr = function(versionArr){
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
  };

  this.generateObjectArray = function(){
    var arr = convertStringToObjArr.call(this);
    return getUniqueObjectArr(arr);
  };
};

module.exports = ObjectArrConverter;
