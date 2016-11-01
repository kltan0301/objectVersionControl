$(document).ready(function(){
  var $searchForm = $('.queryForm');

  $searchForm.submit(function(e){
    e.preventDefault();
    var query = {
      object_type: $(this).serializeArray()[0].value,
      timestamp: $(this).serializeArray()[1].value
    };
    console.log(query);
    $.ajax({
      url: '/api/search',
      data: query
    }).done(addSearchData);
  });

});

function addSearchData(data){
  
  var $resultSection = $('.searchResult');
  $resultSection.empty();
  $resultSection.append(JSON.stringify(data));
  // data.forEach(function(object){
  //   $resultSection.append(JSON.stringify(object));
  // });
}
