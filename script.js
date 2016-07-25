//frame sizing
var frameHeight = 1334;
var frameWidth = 750;
var frameX = 0;
var frameY = 0;
var toofarX = 125;
var toofarY = 1074;
var toofarWidth = 496;
var toofarHeight = 75;
var statusBarHeight = 40;

//background sizing
var backgroundSize = 353;
var backgroundX = 93;
var backgroundY = 287;

//text positioning
var textX = 48;
var titleY = 143;
var descriptionY = 190;
var maxTextWidth = 600;

//element linking
var canvas = document.getElementById("canvas");
var title = document.getElementById("title");
var description = document.getElementById("description");
var background = document.getElementById("background");
var statusBarToggleButton = document.getElementById("statusBarTypeToggle");

//canvas initialization
canvas.setAttribute("width",frameWidth);
canvas.setAttribute("height",frameHeight);
var context = canvas.getContext("2d");

var frameImage;
var tooFarImage;
var statusBarImage;

var frameImage1 = new Image();
var frameImage2 = new Image();

var frameImage1TooFar = new Image();
var frameImage2TooFar = new Image();

var androidStatusBar = new Image();
var iosStatusBar1 = new Image();
var iosStatusBar2 = new Image();

var usingFrameOne = true;
var showTooFar = false;
var showStatusBar = false;
var isiOSStatusBar = true;

var backgroundImage = new Image();

frameImage1.onload = function() {
    drawFrame();
};
backgroundImage.onload = function() {
    drawBackground();
    updateForeground();
};
backgroundImage.crossOrigin = "anonymous";
function drawFrame() {
    context.drawImage(frameImage,frameX,frameY,frameWidth,frameHeight);
    if(showTooFar) {
        context.drawImage(toofarImage,toofarX,toofarY,toofarWidth,toofarHeight);
    }
    if(showStatusBar) {
        context.drawImage(statusBarImage,0,0,frameWidth,statusBarHeight);
    }
}
function drawBackground() {
    if(backgroundImage.width == backgroundImage.height) {
        context.drawImage(backgroundImage,backgroundX,backgroundY,backgroundSize,backgroundSize);
    } else {
        var sourceX;
        var sourceY;
        var size;
        if(backgroundImage.width > backgroundImage.height) {
            sourceX = (backgroundImage.width - backgroundImage.height) / 2;
            sourceY = 0;
            size = backgroundImage.height;
        } else {
            sourceX = 0;
            sourceY = (backgroundImage.height - backgroundImage.width) / 2;
            size = backgroundImage.width;         
        }
        context.drawImage(backgroundImage,sourceX,sourceY,size,size,backgroundX,backgroundY,backgroundSize,backgroundSize);
    }

}
function backgroundUpdate() {
    var file = background.files[0];
    var url = window.URL || window.webkitURL;
    backgroundImage.src = url.createObjectURL(file);
};
function updateForeground() {
    drawFrame();
    drawTexts();
}
function drawTexts() {
    context.font = "40px CarlitoBold";
    context.fillStyle = "#456A6D";
    context.textAlign = "left";
    context.fillText(title.value,textX,titleY,maxTextWidth);
    context.font = "36px CarlitoRegular";
    context.fillText(description.value,textX,descriptionY,maxTextWidth);
}

function toofarChanged() {
    showTooFar = !showTooFar;
    updateForeground();
}
function statusBarChanged() {
    showStatusBar = !showStatusBar;
    updateForeground();
}
function backgroundChanged() {
    if(usingFrameOne) {
        setAlternativeFrameImages();
    } else {
        setDefaultFrameImages();
    }
    usingFrameOne = !usingFrameOne;
    updateStatusBar();
    updateForeground();
}
function setDefaultFrameImages() {
    frameImage = frameImage1;
    toofarImage = frameImage1TooFar;
}
function setAlternativeFrameImages() {
    frameImage = frameImage2;
    toofarImage = frameImage2TooFar;    
}
function toggleStatusBarType() {
    isiOSStatusBar = !isiOSStatusBar;
    updateStatusBar();
    updateForeground();
}
function updateStatusBar() {
    if(isiOSStatusBar) {
        statusBarToggleButton.innerHTML = "iOS Status Bar";
        if(usingFrameOne) {
            statusBarImage = iosStatusBar1;
        } else {
            statusBarImage = iosStatusBar2;
        }

    } else {
        statusBarToggleButton.innerHTML = "Android Status Bar";
        statusBarImage = androidStatusBar;
    }
}
document.body.onload = function() {
    updateForeground(); //in case custom font is still loading or not cached
};
frameImage1.src = "frame1.png";
frameImage2.src = "frame2.png";
frameImage1TooFar.src = "toofar1.png";
frameImage2TooFar.src = "toofar2.png";

androidStatusBar.src = "androidstatus.png";
iosStatusBar1.src = "iosstatus1.png";
iosStatusBar2.src = "iosstatus2.png";

statusBarImage = iosStatusBar1;

setDefaultFrameImages();
