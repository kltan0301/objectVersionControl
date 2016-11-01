var ObjectArrConverter = function(fileArr){
  this.fileArr = fileArr;

  this.convertStringToObjArr = function(){
    var objVersionArr = [];
    //remove header
    this.fileArr.shift();
    //remove last element
    this.fileArr.pop();

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
};

module.exports = ObjectArrConverter;
