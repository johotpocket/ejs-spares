$(document).ready(function(){
  console.log("page loaded")

function deleteBear(e) {
  e.preventDefault();
  var bearId = $(this).attr('id');

//the function that lets us delete the bears
  $.ajax({
    url: '/api/bears/' + bearId,
    method: 'DELETE'
  }).done(function(d){
    console.log(d, "successfully eradicated bear!")
    window.location = "/view";
  })

}

$(".deleteBtn").on('click', deleteBear);



});
