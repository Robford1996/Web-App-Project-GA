////////////////////////////////////////////////////////////////////////////////////////////////////
// Download all the global data on app boot

console.log('Start app');

let parkData = [];

$.ajax("https://api.themeparks.wiki/v1/entity/waltdisneyworldresort/live")
   .then(function (data) {
      parkData = data.liveData;
      console.log('Data downloaded successfully');
   });


////////////////////////////////////////////////////////////////////////////////////////////////////
// When user submits the form with their search query
//filter 
const $form = $('form');
const $input = $('#search-query');

$form.on('submit', function(event) {
   event.preventDefault();
   const searchQuery = $input.val();
   console.log('User searched for: ' + searchQuery);

})
   // Filter the things
   // Show the things

