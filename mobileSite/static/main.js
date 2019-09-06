var lSlider = document.getElementById("LMotor");
var rSlider = document.getElementById("RMotor");
var camActive = false;
var motionActive = false;

function getRequest(component, variable, value){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
      }
    };
    xhttp.open("GET", "http://10.0.0.1:5000/" + component + "?" + variable + "=" + value, true);
    xhttp.send();
}

lSlider.oninput = function() {
    getRequest("lMotor", "speed", lSlider.value);
};

lSlider.onchange = function() {
    lSlider.value = 0;
    getRequest("lMotor", "speed", lSlider.value);
};

rSlider.oninput = function() {
    getRequest("rMotor", "speed", rSlider.value);
};
rSlider.onchange = function() {
    rSlider.value = 0;
    getRequest("rMotor", "speed", rSlider.value);
};

colorslider.oninput = function() {
    eyeColor(colorslider.value);
};

function eyeColor(col) {
    // col = -1 : black
    // col = -2 : rainbow
    // TODO: convert HSL to RGB in webControl.py
    // colorsys.hls_to_rgb(h, l, s)
    if (col >= 350) {
      col = -1
    }
    getRequest("eyes", "color", col);
}

function toggleCam() {
    var source = document.getElementById("camStream")
    if (camActive) {
      source.src = "";
      camActive = false;
    }
    else {
      source.src = "http://10.0.0.1:8080/stream/video.h264";
      camActive = true;
    }
}

function toggleMotionAlert() {
    if (motionActive) {
        getRequest("motion", "val", "stop");
        motionActive = false;
    }
    else {
        if (camActive) {
            toggleCam();
        }
        getRequest("motion", "val", "start");
        motionActive = true;
    }
}
// TODO: Implement Pi to Browser data signal for motion detection
// document.getElementById('motion-modal').click();

function sound(emo) {
    getRequest("sound", "emo", emo);
}
