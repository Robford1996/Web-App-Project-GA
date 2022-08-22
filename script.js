function tabOpen(){
   window.open("https://disneyworld.disney.go.com/vacation-planning/", "_blank")
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Download all the global data on app boot

console.log('Start app');

// let parkData = [];

const $input = $('#attraction-select');
const parkData = $.ajax("https://api.themeparks.wiki/v1/entity/waltdisneyworldresort/live")
   .then(function (data) {
const attractions =  data.liveData.filter(entity => entity.entityType === "ATTRACTION")
var optionsAsString = "";
attractions.map((attraction) => {
   debugger
   const name = attraction.name
   const id = attraction.id
   optionsAsString += `<option value=${id}> ${name} </option>`
 })
$input.append( optionsAsString );
//       // console.log('Data downloaded successfully');
   });


////////////////////////////////////////////////////////////////////////////////////////////////////
// When user submits the form with their search query
//filter 
const $form = $('form');
const $name = $("#name")
const $status = $("#status")
const $queue = $("#queue")

$form.on('submit', function(event) {
   event.preventDefault();
   // debugger
   const selectedAttractionId = $input.val();
   // console.log('User searched for: ' + searchQuery);
   $.ajax(`https://api.themeparks.wiki/v1/entity/${selectedAttractionId}/live`)
   .then(function (data) {
      const attractionData = data.liveData[0];
      const attractionName = attractionData.name
      const attractionStatus = attractionData.status;
      const queueTime = attractionData.queue?.STANDBY?.waitTime || "UNAVAILABLE"
      $name.text(attractionName)
      $status.text(attractionStatus)
      $queue.text(queueTime)
      console.log("it worked");
})
});
   // Filter the things
   // Show the things

//////////////////////////////////////////////////////////////////////
//DINING INFORMATION

const $dining = $('#dining-select')
// const selectedRestaurantId = $dining.val()
parkData.then(function (data){
const restaurants =  data.liveData.filter(entity => entity.entityType === "RESTAURANT")
var optionsAsString = "";
restaurants.map((restaurant) => {
   debugger
   const name = restaurant.name
   const id = restaurant.id
   optionsAsString += `<option value=${id}> ${name} </option>`
 })
$dining.append( optionsAsString );
//       // console.log('Data downloaded successfully');
   });


const $restaurantName = $('#restaurant');
const $restaurantStatus = $("#dining-status")


$form.on('submit', function(event) {
   event.preventDefault();
   // debugger
   const selectedRestaurantId = $dining.val();
      $.ajax(`https://api.themeparks.wiki/v1/entity/${selectedRestaurantId}/live`).then(function (data) {
      const restaurantData = data.liveData[0];
      const restaurantName = restaurantData.name;
      const restaurantStatus = restaurantData.status;
      $restaurantName.text(restaurantName)
      $restaurantStatus.text(restaurantStatus)
      console.log("it worked");
})
});
//////////////////////////////////////////////////////////////////////
//SHOW INFORMATION