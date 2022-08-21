// console.log("js works")

function tabOpen(){
    window.open("https://disneyworld.disney.go.com/vacation-planning/", "_blank")
}

console.log("https://api.themeparks.wiki/v1/entity/waltdisneyworldresort/live")

// console.log($.ajax("https://api.themeparks.wiki/v1/entity/waltdisneyworldresort/live&t=teppan_edo"))

const URL = "https://api.themeparks.wiki/v1/entity/waltdisneyworldresort/live=";

//Variables
const $name = $("#name")
const $entitytype = $("#entitytype")
const $status = $("#status")
const $showtimes = $("#showtimes")
const $queue = $("#queue")
const $input = $('input[type="text"]')
const $form = $("form")

$form.on("submit", handleGetData)

function handleGetData(event){
    event.preventDefault()
    userInput = $input.val()

$.ajax(URL+userInput).then(function(data){
    console.log('Information Posted!')
    console.log(data)
    $name.text(data.Name)
    $entitytype.text(data.Entitytype)
    $status.text(data.Status)
    $showtimes.text(data.Showtimes)
    $queue.text(data.Queue)
}, function(error){
    console.log("we broke it")
    console.log(error)
})
}

//event listener possibly? to click on an image to bump down to ___ section on webpage


// $('html, body').animate({ scrollTop: 0 }, 'fast');
// either or ^ v cr stack overflow https://stackoverflow.com/questions/4147112/how-to-jump-to-top-of-browser-page
// $('html,body').scrollTop(0);

// $("body").css("page-size", "150%")

// const img = document.querySelector('img')
// img.onclick = () => {
//   console.log('clicked')
// }


// const btn = document.querySelector(".btn")
// btn.addEventListener("click", function (evt) {
//   console.log(evt)
// })

// const btn = document.querySelector('a')
// btn.addEventListener("click", function(evt){
//     console.log(evt)
// })