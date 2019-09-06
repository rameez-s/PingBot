var motionVal = getElementById("motionValue");
var motionCaught = false;
var alarmNoise = new Audio();

if (motionVal == "True" && !motionCaught) {
  motionCaught = true;
  document.body.style.backgroundColor = "red";
  alarmNoise.play();
}
else {
  motionCaught = false;
  location.reload();
}
