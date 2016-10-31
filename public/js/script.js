$(document).ready(function(){
  var $searchForm = $('.queryForm');

  $searchForm.submit(function(e){
    e.preventDefault();
    var search = $(this).serializeArray()[0];

    $.ajax({
      url: '/api/search',
      data: search
    }).done(addSearchData);
  });

});

function addSearchData(data){
  var $resultSection = $('.searchResult');
  $resultSection.empty();
  data.forEach(function(object){
    $resultSection.append(JSON.stringify(object));
  });
}
