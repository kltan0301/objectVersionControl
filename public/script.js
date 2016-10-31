$(document).ready(function(){
  var $searchForm = $('.queryForm');
  $searchForm.submit(function(e){
    e.preventDefault();
    var search = $(this).serializeArray()[0].value;

    $.ajax({
      url: '/'
    })
  });
});
