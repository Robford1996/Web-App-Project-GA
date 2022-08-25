function tabOpen(){
   window.open("https://disneyworld.disney.go.com/vacation-planning/", "_blank")
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Download all the global data on app boot

console.log('Start app');

// let parkData = [];

const $attractionSelect = $('#attraction-select');
const $restaurantSelect = $('#dining-select')
const $showsSelect = $('#shows-select')
const parkData = $.ajax("https://api.themeparks.wiki/v1/entity/waltdisneyworldresort/live")
   .then(function (data) {
      // const attractions =  data.liveData.filter(entity => entity.entityType === "ATTRACTION")
      var attractionsOptionsAsString = "";
      var restaurantsOptionsAsString = "";
      var showsOptionsAsStrings = "";
      data.liveData.map((entity) => {
         if (entity.entityType === "ATTRACTION"){
            const name = entity.name
            const id = entity.id
            attractionsOptionsAsString += `<option value=${id}> ${name} </option>`
         }else if(entity.entityType === "RESTAURANT"){
            const name = entity.name
            const id = entity.id
            // console.log(restaurant.name)
            // console.log(restaurant)
            restaurantsOptionsAsString += `<option value=${id}> ${name} </option>`
         }else if(entity.entityType === "SHOW"){
            const name = entity.name
            const id = entity.id
            showsOptionsAsStrings += `<option value=${id}> ${name} </option>`
         }
         // debugger
      })
      $attractionSelect.append( attractionsOptionsAsString );
      $restaurantSelect.append(restaurantsOptionsAsString);
      $showsSelect.append(showsOptionsAsStrings);
      return data 
//       // console.log('Data downloaded successfully');
   });


////////////////////////////////////////////////////////////////////////////////////////////////////
// When user submits the form with their search query
//filter 
const $form = $('#top');
const $name = $("#name")
const $status = $("#status")
const $queue = $("#queue")

$form.on('submit', function(event) {
   event.preventDefault();
   // debugger
   const selectedAttractionId = $attractionSelect.val();
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

// const $dining = $('#dining-select')
// // const selectedRestaurantId = $dining.val()
// parkData.then(function (data){
// const restaurants =  data.liveData.filter(entity => entity.entityType === "RESTAURANT")
// // debugger
// // console.log
// var optionsAsString = "";
// restaurants.map((restaurant) => {
//    // debugger
//    const restaurantName = restaurant.name
//    const restaurantId = restaurant.id
//    console.log(restaurant.name)
//    console.log(restaurant)
//    optionsAsString += `<option value=${restaurantId}> ${restaurantName} </option>`
//  })
// $dining.append( optionsAsString );
// //       // console.log('Data downloaded successfully');
//    });


const $diningForm = $("#food");
const $restaurantName = $('#restaurant-name');
const $restaurantStatus = $("#dining-status");


$diningForm.on('submit', function(event) {
   event.preventDefault();
   // debugger
   const selectedRestaurantId = $restaurantSelect.val();
   // debugger
   $.ajax(`https://api.themeparks.wiki/v1/entity/${selectedRestaurantId}/live`).then(function (data) {
      const restaurantData = data.liveData[0];
      const restaurantNamed = restaurantData.name;
      const restaurantStatus = restaurantData.status;
      $restaurantName.text(restaurantNamed)
      $restaurantStatus.text(restaurantStatus)
      console.log("it worked");
})
});
//////////////////////////////////////////////////////////////////////
//SHOW INFORMATION

const $showForm = $('#fantasmic');
const $showName = $('#show-name');
const $showStatus = $('#show-status')
const $showTimes = $('#show-times')

$showForm.on('submit', function(event){
   event.preventDefault()
   const selectedShowId = $showsSelect.val();
   $.ajax(`https://api.themeparks.wiki/v1/entity/${selectedShowId}/live`).then(function (data) {
   const showData = data.liveData[0];
   const showName = showData.name;
   const showStatus = showData.status;
   const showTimes = showData.showtimes;
   const startTime = showTimes.map((showtime) => showtime.startTime);
   // $(".each").append(startTime)
   console.log(startTime)
   $showName.text(showName);
   $showStatus.text(showStatus);
   $showTimes.text(startTime);
})
})