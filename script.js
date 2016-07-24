var frameHeight = 1334;
var frameWidth = 750;
var frameX = 0;
var frameY = 0;
var backgroundSize = 582;
var backgroundX = 85;
var backgroundY = 358;
var textX = 48;
var titleY = 143;
var descriptionY = 190;
var maxTextWidth = 600;
var canvas = document.getElementById("canvas");
var title = document.getElementById("title");
var description = document.getElementById("description");
var background = document.getElementById("background");
canvas.setAttribute("width",frameWidth);
canvas.setAttribute("height",frameHeight);
var context = canvas.getContext("2d");
var frameImage = new Image();
var backgroundImage = new Image();
frameImage.onload = function() {
    imageUpdates();
};
backgroundImage.onload = function() {
    imageUpdates();
    drawTexts();
};
backgroundImage.crossOrigin = "anonymous";
function imageUpdates() {
    drawBackground();
    drawFrame();
}
function drawFrame() {
    context.drawImage(frameImage,frameX,frameY,frameWidth,frameHeight);
}
function drawBackground() {
    if(backgroundImage.src == "") {
        drawBlack();
    } else {
        context.drawImage(backgroundImage,backgroundX,backgroundY,backgroundSize,backgroundSize);
    }
}
function drawBlack() {
    context.beginPath();
	context.fillRect(0,0,frameWidth,frameHeight);
	context.stroke();
}
function backgroundUpdate() {
    var file = background.files[0];
    var url = window.URL || window.webkitURL;
    backgroundImage.src = url.createObjectURL(file);
}

function saveImage() {
    document.href = canvas.toDataURL();
}

function updateText() {
    drawFrame();
    drawTexts();
}
function drawTexts() {
    context.font = "bold 40px Calibri";
    context.fillStyle = "#456A6D";
    context.textAlign = "left";
    context.fillText(title.value,textX,titleY,maxTextWidth);
    context.font = "36px Calibri";
    context.fillText(description.value,textX,descriptionY,maxTextWidth);
}
frameImage.src = "frame.png";
