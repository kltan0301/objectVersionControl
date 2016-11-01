$(document).ready(function(){
  var $searchForm = $('.queryForm');

  $searchForm.submit(function(e){
    e.preventDefault();
    //retrieve input query, takes in current date as default value
    var query = {
      object_type: $(this).serializeArray()[0].value,
      timestamp: $(this).serializeArray()[1].value || new Date()
    };

    $.ajax({
      url: '/api/search',
      data: query
    }).done(addSearchData);
  });

});

function addSearchData(data){
  var $resultSection = $('.searchResult');
  $resultSection.empty();
  if(Object.keys(data).length > 0){
    $resultSection.append($('<h2>').text(JSON.stringify(data)));
  }else{
    $resultSection.append($('<h2>').text("Object not found"));
  }
}
