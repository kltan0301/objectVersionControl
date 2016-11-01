var ObjectArrConverter = require('../models/objectArrConverter');

describe("ObjectArrConverter", function(){

  describe('#convertStrToObjectArr', function(){

    it("should return array of objects", function(){
      var fileArr = [ 'object_id,object_type,timestamp,object_changes',
      ' 1,ObjectA,412351252,{property1: "value", property3: "value", property2: "value"}',
      ' 1,ObjectA,452351252,{property1: "new value"}',
      '' ];
      var converter = new ObjectArrConverter(fileArr);
      var resultArr = [
        { object_type : 'ObjectA',
          timestamp : new Date('Tue Jan 25 1983 22:00:52 GMT+0800 (SGT)'),
          object_changes : '{property1: "value", property3: "value", property2: "value"}' },
        { object_type : 'ObjectA',
          timestamp : new Date('Wed May 02 1984 21:07:32 GMT+0800 (SGT)'),
          object_changes : '{property1: "new value"}' }  ];

      expect(converter.convertStringToObjArr()).toEqual(resultArr);
    });

  });
});
