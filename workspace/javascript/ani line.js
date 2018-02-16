var canvas = $("#paper")[0];
var c = canvas.getContext("2d");

var startX = 0;
var startY = 0;
var endX = 500;
var endY = 500;
var amount = 0;
setInterval(function() {
    amount += 0.05; // change to alter duration
    if (amount > 1) amount = 1;
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.strokeStyle = "black";
    c.moveTo(startX, startY);
    // lerp : a  + (b - a) * f
    c.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
    c.stroke();
}, 100);