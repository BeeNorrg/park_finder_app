

//import dayjs from 'dayjs' // ES 2015

var currentDate = moment().format("h:mm | M/DD/YYYY");
$("#currentDate").text(currentDate);

const welcomeQuotes = ["Discover your next adventure","Leave no trail untraveled", "The great outdoors starts here", "Wake up to a breath of fresh air", "The mountains are calling your name", "Life is greener on the other side", "A beginnning to a beautiful day"]
const random = Math.floor(Math.random() * welcomeQuotes.length);
const chosenQuote = welcomeQuotes[random];
document.getElementById("welcome_msg").innerHTML = chosenQuote + ". . .";
console.log(chosenQuote);

setTimeout(function () {
    var d = new Date();
    var time = d.getHours();
    if (time >= 22 || time < 5) {
        console.log("time between 10pm and 5am: night")
        document.getElementById("skyImage").src = "../assets/night.jpg";

    }
    else if (time >= 5 && time < 8) {
        console.log("time between 5am and 8am: morning")
        document.getElementById("skyImage").src = "../assets/morningAndEvening.png";
    }
    else if (time >= 8 && time < 19) {
        console.log("time between 8am and 7pm: noon")
        document.getElementById("skyImage").src = "../assets/noon.png";
    }
    else if (time >= 19 && time < 22) {
        console.log("time between 8am and 7pm: evening")
        document.getElementById("skyImage").src = "../assets/morningAndEvening.png";
    }
    console.log(time);
}, 10);