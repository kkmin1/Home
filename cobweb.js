// cobweb.js
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");

/////////////////////////////////////////////////////////////////////////////////////////
// A graph for drawing many things. Graph라는 큰 객체를 만들어 두고 필요할 때 내부의 요소들을 사용
function Graph(canvas){
    var margin=70;
    var xmin=glob.xmin;
    var ymin=glob.ymin;
    var xmax=glob.xmax;
    var ymax=glob.ymax;
    var canvas=canvas;
    var ctx=canvas.getContext('2d');
    var h=canvas.height;
    var w=canvas.width;
    var h1=canvas.height-margin;
    var w1=canvas.width-margin;
    var borderSize=2; // a differently-colored area at the outermost part of the canvas to visually indicate the graph's border
    if(2*borderSize>h || 2*borderSize>w){ // disable border if it's going to be too big
        borderSize=0;
    }
    var edgeSize=borderSize+0.5; // This small buffer zone close to the border keeps the graph from going half a pixel too far, at least in firefox.

    // Blank out the canvas to a pristine state.
    this.resetCanvas=function(){
        // make border

        ctx.fillStyle="white";
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle="black";
    }

    // convert a mathematical x coordinate to a canvas x coordinate
    // 그래프의 x 값을 캔버스값으로 편경. 화면 입력값이 그래프값임을 상기.
    function mathToCanvasX(x){
        max=w-edgeSize*2;
        portion=(x-xmin)/(xmax-xmin);
        return portion*max+edgeSize+margin;
    }
    // convert a mathematical y coordinate to a canvas y coordinate
    function mathToCanvasY(y){
        max=h-edgeSize*2;
        portion=(y-ymin)/(ymax-ymin);
        return h-(portion*max+edgeSize+margin);
    }

    // Plot a line segment, using math function x and y coordinates (not canvas coordinates).
    this.plotLine=function(x1,y1,x2,y2){
        // convert coordinates
        var cx1=mathToCanvasX(x1);
        var cy1=mathToCanvasY(y1);
        var cx2=mathToCanvasX(x2);
        var cy2=mathToCanvasY(y2);

        // plot the line segment
        ctx.beginPath();
        ctx.moveTo(cx1,cy1);
        ctx.lineTo(cx2,cy2);
    // ctx.strokeStyle="green";
        ctx.stroke();
        ctx.closePath();

        // change color for next draw action
        // this.nextColor();
    }

 // Plot a line segment, using math function x and y coordinates (from canvas coordinates).
 // 화살표 축을 그린다.
     this.plotLine2=function(x1,y1,x2,y2){
     var deg=30;
     var scale=0.98; // 내분 비율

     var sx1=x1+(x2-x1)*scale; // 내분점
     var sy1=y1+(y2-y1)*scale; // 내분점
        // plot the line segment
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.strokeStyle="black"; // 축 색깔 지정.
        ctx.stroke();
        ctx.closePath();

    // 화살표 윗부분 그림
       ctx.save(); // saves the coordinate system
       ctx.translate(x2,y2);
       ctx.rotate(deg * Math.PI / 180); // (x2,y2)을 중심으로 시계방향으로 deg도 회전
       ctx.beginPath();
       ctx.moveTo(0,0);
       ctx.lineTo(sx1-x2,sy1-y2);
       ctx.stroke();

   // 화살표 아랫부분 그림
       ctx.rotate(10*deg * Math.PI / 180); // (x2,y2)을 중심으로 시계방향으로 10*deg도 회전
       ctx.beginPath();
       ctx.moveTo(0,0);
       ctx.lineTo(sx1-x2,sy1-y2);
       ctx.stroke();
       ctx.restore(); // restore canvas. 원래 캔버스로 돌아온다.
    }

    // Plot red cobweb line segment
    this.plotLine3=function(x1,y1,x2,y2){
        // convert coordinates
        var cx1=mathToCanvasX(x1);
        var cy1=mathToCanvasY(y1);
        var cx2=mathToCanvasX(x2);
        var cy2=mathToCanvasY(y2);

        ctx.beginPath();
        ctx.moveTo(cx1,cy1);
        ctx.lineTo(cx2,cy2);
        ctx.strokeStyle="green"; // cobweb 곡선 색깔
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle="black";

        // change color for next draw action
        // this.nextColor();
    }

    this.plotLine4=function(x1,y1,x2,y2){
        // convert coordinates
        var cx1=mathToCanvasX(x1);
        var cy1=mathToCanvasY(y1);
        var cx2=mathToCanvasX(x2);
        var cy2=mathToCanvasY(y2);

        // plot the line segment
        ctx.beginPath();
        ctx.moveTo(cx1,cy1);
        ctx.lineTo(cx2,cy2);
        ctx.strokeStyle="red"; // 수요곡선 색깔
        ctx.stroke();
        ctx.closePath();
        // change color for next draw action
        // this.nextColor();
        }

        this.plotLine5=function(x1,y1,x2,y2){
            // convert coordinates
            var cx1=mathToCanvasX(x1);
            var cy1=mathToCanvasY(y1);
            var cx2=mathToCanvasX(x2);
            var cy2=mathToCanvasY(y2);

            // plot the line segment
            ctx.beginPath();
            ctx.moveTo(cx1,cy1);
            ctx.lineTo(cx2,cy2);
            ctx.strokeStyle="blue"; // 공급곡선 색깔
            ctx.stroke();
            ctx.closePath();
            // change color for next draw action
            // this.nextColor();
            }

// 축 그리는 함수
      this.axes=function(){
    	var x1=glob.x1;
      var cx1=mathToCanvasX(x1); // 그래프의 x 값을 캔버스값으로 편경
    	ctx.font = "20px Arial";
    	ctx.fillText("0",margin-30,h1+30);
    	ctx.fillText("수량", w1+30, h1+40);
    	ctx.fillText("가격", margin-20, margin-10);
      ctx.font = "12px Arial";
      ctx.fillStyle = 'red';
      ctx.fillText("수요곡선 : 빨간색",500,220);
      ctx.fillStyle = 'blue';
      ctx.fillText("공급곡선 : 파란색",500,250);
      ctx.font = "20px Arial";
      ctx.fillText(x1, cx1-10, h1+30); // x축에 초기값을 표시
      this.plotLine2(0,h1,w1+60,h1); // x 축 그림
      this.plotLine2(margin,h,margin,margin); // y 축 그림
    }

    // 임의의 함수식에 대해 그래프를 그리는 함수
    // 수요 곡선
    this.plotFunction=function(f){
        // get initial point and distance between points
        x1=xmin;
        y1=f(x1);
        delta=(xmax-xmin)/(w-2*borderSize);
        // Go thru all point values, with 'delta/2' to avoid rounding error preventing the last point from being drawn.
        // Note: Altho "<" vs "<=" is irrelevant with probability 1, only "<" avoids an infinite loop when xmin==xmax, like when their both zero from nothing being entered.
        // x의 조그만 증가에 대한 y의 조그만 증가를 이용하여 두 점을 조금씩 연결하여 감으로써 그래프를 그림
       for(var x2=xmin+delta; x2<xmax+delta/2; x2+=delta){
            y2=f(x2);
            this.plotLine4(x1,y1,x2,y2);
            x1=x2;
            y1=y2;
        }
    }

// 공급곡선
    this.plotFunction2=function(f){
        // get initial point and distance between points
        x1=xmin;
        y1=f(x1);
        delta=(xmax-xmin)/(w-2*borderSize);
        // Go thru all point values, with 'delta/2' to avoid rounding error preventing the last point from being drawn.
        // Note: Altho "<" vs "<=" is irrelevant with probability 1, only "<" avoids an infinite loop when xmin==xmax, like when their both zero from nothing being entered.
        // x의 조그만 증가에 대한 y의 조그만 증가를 이용하여 두 점을 조금씩 연결하여 감으로써 그래프를 그림
       for(var x2=xmin+delta; x2<xmax+delta/2; x2+=delta){
            y2=f(x2);
            this.plotLine5(x1,y1,x2,y2);
            x1=x2;
            y1=y2;
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////

// helper function for debugging
function log(message) {
    // Note: Getting the line number like this is very browser-specific. This is only tested in Firefox 53 on Linux.
    line=new Error().stack.split('\n')[1].split(':').reverse().splice(0,2).reverse().join(':');
    console.log(line+": "+message);
}

/////////////////////////////////////////////////////////////////////////////////////////
// 문자열인 식 표현을 함수값으로 변환하는 함수
function parseFunction(func){
    // It's tempting to use "return function(x){return eval(func);};", but that takes about 30% longer.
    eval("var f=function(x){return "+func+";};");
    return f;
}
/////////////////////////////////////////////////////////////////////////////////////////

// GLobal OBjects
var glob={};

/////////////////////////////////////////////////////////////////////////////////////////
// cobweb 선분을 그린다.
function cobweb(){
    var xmin=glob.xmin;
    var ymin=glob.ymin;
    var xmax=glob.xmax;
    var ymax=glob.ymax;
    var iters=glob.iters;
    var graph=glob.graph;
    var func=glob.execFunc;
    var func3=glob.execFunc3;
    var x1=glob.x1;
    var y1=func(x1);
    graph.plotLine3(x1,0,x1,y1);

    for (var i=0;i<iters;i++){
        var x2=func3(y1);
        var y2=func(x2);
        if (x2>=xmin && x2<=xmax) {
        setTimeout(graph.plotLine3(x1,y1,x2,y1),3000);
        setTimeout(graph.plotLine3(x2,y1,x2,y2),3000);
        x1=x2;
        y1=y2;
        }
    }
    glob.x1=x1;
}
/////////////////////////////////////////////////////////////////////////////////////////

function cont(){
	cobweb();
}

/////////////////////////////////////////////////////////////////////////////////////////
// cobweb 도형을 지우는 함수, 수요, 공급 곡선만 그림
function clearCont(){
	plotFn(); // 수요, 공급 곡선만 그림
     // cobweb(testTheme);
}

/////////////////////////////////////////////////////////////////////////////////////////
// 수요, 공급 곡선을 그리는 함수
function plotFn(){
    glob.graph.plotFunction(glob.execFunc);  // 수요곡선을 그린다.
    glob.graph.plotFunction2(glob.execFunc2);  // 공급곡선을 그린다.
    glob.graph.axes(); // 축을 그린다.
}

/////////////////////////////////////////////////////////////////////////////////////////
// 모든 그림을 그리는 함수
function generate() {
    startTime=Date.now();
    formToGlob();
    globToHash();
    glob.execFunc=parseFunction(glob.func);
    glob.execFunc2=parseFunction(glob.func2);
    glob.execFunc3=parseFunction(glob.func3);
    var canvas=get('canvas');
    var graph=new Graph(canvas);
    graph.resetCanvas();
    glob.graph=graph;
    plotFn(); // 수요, 공급곡선을 그려라.
    // plot cobweb
    // cobweb(testTheme); // cobweb 도형을 그려라.

    endTime=Date.now();
    log("Diagram generated in "+(endTime-startTime)+" milliseconds.");
}
/////////////////////////////////////////////////////////////////////////////////////////
function generate2() {
    startTime=Date.now();
    formToGlob();
    globToHash();
    glob.execFunc=parseFunction(glob.func);
    glob.execFunc2=parseFunction(glob.func2);
    glob.execFunc3=parseFunction(glob.func3);
   var canvas=get('canvas');
   var graph=new Graph(canvas);
   graph.resetCanvas();
    glob.graph=graph;
    plotFn(); // 수요, 공급곡선을 그려라.

    // plot cobweb
    cobweb(); // cobweb 도형을 그려라.

    endTime=Date.now();
    log("Diagram generated in "+(endTime-startTime)+" milliseconds.");
}
