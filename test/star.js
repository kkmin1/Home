<!DOCTYPE html>
<html lang="ko">
<head>
<script>
window.onload=function()
{

var canvas = document.getElementById("canvas1");
var context = canvas.getContext("2d");
context.fillRect(0,0,150,100);
context.fillText("Hello, HTML5!",155,110);
context.lineTo(300,100);
context.rect(0,0,300,200);
context.stroke();
context.closePath();
};
</script>

<body>
<canvas id="canvas1" height="400" width="400"></canvas>
</body>
</html>