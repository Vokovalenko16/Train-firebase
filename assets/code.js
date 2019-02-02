$(document).ready(function() {


setInterval(function() {
var time = new Date();
var s = time.getSeconds();
var m = time.getMinutes();
var h = time.getHours();
var totalMin = (h*60) + m;
$("#hour").text(h);
$("#minute").text(m);
$("#second").text(s);
}, 1000)

var config = {
    apiKey: "AIzaSyAXy1zsnkj_nk7fnIMGrWgAIIuOGcwan_M",
    authDomain: "project-999a2.firebaseapp.com",
    databaseURL: "https://project-999a2.firebaseio.com",
    projectId: "project-999a2",
    storageBucket: "project-999a2.appspot.com",
    messagingSenderId: "880098285603"
  };
  firebase.initializeApp(config);

$("#send-info").on("click", () => {

  event.preventDefault();

  name = $("#trainName").val().trim();
  destination = $("#trainDestination").val().trim();
  first = $("#trainTime").val().trim();
  frequency = $("#frequency").val().trim(); 

 // Creates local "temporary" object for holding employee data

var newTRAIN = {
  name:name,
  destination:destination,
  first:first,
  frequency:frequency
};


firebase.database().ref().push(newTRAIN) 

console.log(name);
console.log(destination);
console.log(first);
console.log(frequency);

alert("Train successfully added");

// Clears all of the text-boxes
$("#trainName").val("")
$("#trainDestination").val("")
$("#trainTime").val("")
$("#frequency").val("")
});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
 firebase.database().ref().on("child_added", (snapshot) => {
  
  var na = (snapshot.val().name)
  var de = (snapshot.val().destination)
  var fi = (snapshot.val().first)
  var fr = (snapshot.val().frequency) 

//find out the first train time in minutes//

var firstinMin = parseInt(fi.slice(0,2)*60) + parseInt(fi.slice(3,5))
console.log(firstinMin)
//find out how often that train runs//
var howMany = Math.floor((1440-firstinMin)/fr);
console.log(howMany);

let j = parseInt(fr);
//push all those possible times to an array of when it is here//
let ArrayTimes = [];
for (var ii = 0; ii<howMany; ii++) {
        ArrayTimes.push(firstinMin+=j)
  }
console.log(ArrayTimes);
//if local time is greater then the last train, substract 
function closest () {
  var curr = ArrayTimes[0];
  var diff = Math.abs(totalMin - curr);
  for (var jj = 0; jj < ArrayTimes.length; jj++) {
      var newdiff = Math.abs(totalMin - ArrayTimes[jj]);
      if (newdiff < diff) {
          diff = newdiff;
          curr = ArrayTimes[jj];
      }
  }
  if (parseInt(curr)<=parseInt(totalMin)) {
    var NextTime = (parseInt(curr)+parseInt(fr))
  } else {
  NextTime = parseInt(curr)
  }
var nextTrainInput = Math.floor(NextTime/60)
var nextTrainInput1 = nextTrainInput.toString();
var nextTrainInput2 = nextTrainInput1  + ":" + (NextTime%60)
console.log(nextTrainInput2);
var TimeLeftTillNext = NextTime-totalMin
console.log(TimeLeftTillNext);

$(".main-table tr:last").after(
  "<tr> <td>" + na + "</td> <td>" + de + "</td> <td>" + 
   fr + "</td> <td>" + nextTrainInput2 + "</td> <td>" + TimeLeftTillNext + "</td> </tr>")
};

var time = new Date();
var s = time.getSeconds();
var m = time.getMinutes();
var h = time.getHours();
var totalMin = (h*60) + m;

closest(totalMin, ArrayTimes);

  });
});


