function Graph(canvas){
    const margin=70;
    const xmin=glob.xmin;
    const ymin=glob.ymin;
    const xmax=glob.xmax;
    const ymax=glob.ymax;
    const ctx=canvas.getContext('2d');
    const h=canvas.height;
    const w=canvas.width;
    const h1=canvas.height-margin;
    const w1=canvas.width-margin;
    let borderSize=2;
    if(2*borderSize>h || 2*borderSize>w){ borderSize=0; }
    const edgeSize=borderSize+0.5;


    this.resetCanvas=function(){
        ctx.fillStyle='white';
        ctx.fillRect(0,0,w,h);
        ctx.fillStyle='black';
    };


    function mathToCanvasX(x){
        const max=w-edgeSize*2-margin;
        const portion=(x-xmin)/(xmax-xmin);
        return portion*max+edgeSize+margin;
    }


    function mathToCanvasY(y){
        const max=h-edgeSize*2-margin;
        const portion=(y-ymin)/(ymax-ymin);
        return h-(portion*max+edgeSize+margin);
    }


    this.plotLine=function(x1,y1,x2,y2,color='black'){
        if (![x1,y1,x2,y2].every(Number.isFinite)) return;
        const cx1=mathToCanvasX(x1), cy1=mathToCanvasY(y1);
        const cx2=mathToCanvasX(x2), cy2=mathToCanvasY(y2);
        ctx.beginPath();
        ctx.moveTo(cx1,cy1);
        ctx.lineTo(cx2,cy2);
        ctx.strokeStyle=color;
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle='black';
    };


    this.plotLine2=function(x1,y1,x2,y2){
        const deg=30;
        const scale=0.98;
        const sx1=x1+(x2-x1)*scale;
        const sy1=y1+(y2-y1)*scale;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.strokeStyle='black';
        ctx.stroke();
        ctx.closePath();
        ctx.save();
        ctx.translate(x2,y2);
        ctx.rotate(deg*Math.PI/180);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(sx1-x2,sy1-y2);
        ctx.stroke();
        ctx.rotate(10*deg*Math.PI/180);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(sx1-x2,sy1-y2);
        ctx.stroke();
        ctx.restore();
    };


    this.plotLine3=(x1,y1,x2,y2)=>this.plotLine(x1,y1,x2,y2,'green');
    this.plotLine4=(x1,y1,x2,y2)=>this.plotLine(x1,y1,x2,y2,'red');
    this.plotLine5=(x1,y1,x2,y2)=>this.plotLine(x1,y1,x2,y2,'blue');


    this.axes=function(){
        const x1=glob.x1;
        const cx1=mathToCanvasX(x1);
        ctx.font='20px Arial';
        ctx.fillStyle='black';
        ctx.fillText('0',margin-30,h1+30);
        ctx.fillText('수량',w1+30,h1+40);
        ctx.fillText('가격',margin-20,margin-10);
        ctx.font='12px Arial';
        ctx.fillStyle='red';
        ctx.fillText('수요곡선 : 빨간색',500,220);
        ctx.fillStyle='blue';
        ctx.fillText('공급곡선 : 파란색',500,250);
        ctx.font='20px Arial';
        ctx.fillStyle='black';
        ctx.fillText(String(x1),cx1-10,h1+30);
        this.plotLine2(0,h1,w1+60,h1);
        this.plotLine2(margin,h,margin,margin);
    };


    function plotFunction(f, plotter){
        let x1=xmin;
        let y1=f(x1);
        const delta=(xmax-xmin)/Math.max(100,w-2*borderSize);
        for(let x2=xmin+delta; x2<xmax+delta/2; x2+=delta){
            const y2=f(x2);
            if(Number.isFinite(y1) && Number.isFinite(y2)) plotter(x1,y1,x2,y2);
            x1=x2;
            y1=y2;
        }
    }


    this.plotFunction=f=>plotFunction(f,this.plotLine4);
    this.plotFunction2=f=>plotFunction(f,this.plotLine5);
}


function log(message){
    console.log(message);
}


function parseFunction(func){
    return new Function('x','"use strict"; return ('+func+');');
}


const glob={};


function bisectRoot(f,a,b,fa,fb,tol=1e-10,maxIter=80){
    if(Math.abs(fa)<tol) return a;
    if(Math.abs(fb)<tol) return b;
    let lo=a, hi=b, flo=fa;
    for(let i=0;i<maxIter;i++){
        const mid=(lo+hi)/2;
        const fm=f(mid);
        if(!Number.isFinite(fm)) return NaN;
        if(Math.abs(fm)<tol || Math.abs(hi-lo)<tol) return mid;
        if(flo*fm<=0){
            hi=mid;
        }else{
            lo=mid;
            flo=fm;
        }
    }
    return (lo+hi)/2;
}


function inverseSupplyRoots(price){
    const supply=glob.execFunc2;
    const xmin=glob.xmin, xmax=glob.xmax;
    const samples=Math.max(400,Math.min(4000,Number(glob.rootSamples)||1200));
    const dx=(xmax-xmin)/samples;
    const residual=q=>supply(q)-price;
    const roots=[];
    const rootTol=Math.max(1e-8,(xmax-xmin)*1e-8);


    function addRoot(r){
        if(!Number.isFinite(r) || r<xmin-rootTol || r>xmax+rootTol) return;
        const rr=Math.min(xmax,Math.max(xmin,r));
        if(!roots.some(v=>Math.abs(v-rr)<Math.max(1e-6,(xmax-xmin)*1e-5))) roots.push(rr);
    }


    let x0=xmin;
    let f0=residual(x0);
    if(Number.isFinite(f0) && Math.abs(f0)<rootTol) addRoot(x0);
    let prevAbs=Number.isFinite(f0)?Math.abs(f0):Infinity;
    let prevX=x0;
    let prevF=f0;


    for(let i=1;i<=samples;i++){
        const x1=(i===samples)?xmax:xmin+i*dx;
        const f1=residual(x1);
        if(Number.isFinite(f1)){
            if(Math.abs(f1)<rootTol) addRoot(x1);
            if(Number.isFinite(prevF) && prevF*f1<0){
                addRoot(bisectRoot(residual,prevX,x1,prevF,f1));
            }
            if(i<samples){
                const x2=Math.min(xmax,x1+dx);
                const f2=residual(x2);
                if(Number.isFinite(f2) && Math.abs(f1)<=prevAbs && Math.abs(f1)<=Math.abs(f2) && Math.abs(f1)<Math.max(1e-5,dx*dx)) addRoot(x1);
            }
            prevAbs=Math.abs(f1);
        }
        prevX=x1;
        prevF=f1;
    }
    roots.sort((a,b)=>a-b);
    return roots;
}


function chooseBranch(roots,currentQ){
    if(!roots.length) return NaN;
    const mode=glob.branch||'nearest';
    if(mode==='lower') return roots[0];
    if(mode==='upper') return roots[roots.length-1];
    return roots.reduce((best,q)=>Math.abs(q-currentQ)<Math.abs(best-currentQ)?q:best,roots[0]);
}


function nextQuantity(currentQ){
    const price=glob.execFunc(currentQ);
    if(!Number.isFinite(price)) return {q:NaN,p:price,roots:[]};
    const roots=inverseSupplyRoots(price);
    return {q:chooseBranch(roots,currentQ),p:price,roots};
}


function estimateLyapunov(x0,steps=350,burn=60){
    const span=Math.max(1e-9,glob.xmax-glob.xmin);
    const eps=span*1e-6;
    let x=x0;
    let sum=0, count=0;
    for(let i=0;i<steps;i++){
        const n=nextQuantity(x);
        if(!Number.isFinite(n.q)) return NaN;
        if(i>=burn){
            const np=nextQuantity(x+eps).q;
            const nm=nextQuantity(x-eps).q;
            if(Number.isFinite(np) && Number.isFinite(nm)){
                const deriv=(np-nm)/(2*eps);
                if(Number.isFinite(deriv) && Math.abs(deriv)>1e-12){
                    sum+=Math.log(Math.abs(deriv));
                    count++;
                }
            }
        }
        x=n.q;
    }
    return count?sum/count:NaN;
}


function updateChaosStatus(initialQ,iterations,branchSwitches){
    const box=document.getElementById('chaosStatus');
    if(!box) return;
    const lambda=estimateLyapunov(initialQ);
    let label='판정 불가';
    if(Number.isFinite(lambda)){
        if(lambda>0.02) label='카오스 가능성이 높음';
        else if(lambda<-0.02) label='안정/주기 궤도 가능성이 높음';
        else label='카오스 경계 부근';
    }
    box.innerHTML='결정론적 동학 진단: <strong>'+label+'</strong>'+ 
        (Number.isFinite(lambda)?' (수치 Lyapunov 지수 ≈ '+lambda.toFixed(3)+')':'')+
        ' · 유효 반복 '+iterations+'회 · branch 전환 '+branchSwitches+'회';
}



function plotTimeSeries(series){
    const canvas=document.getElementById('timeSeriesCanvas');
    if(!canvas) return;
    const ctx=canvas.getContext('2d');
    const w=canvas.width, h=canvas.height;
    const marginLeft=60, marginRight=25, marginTop=35, marginBottom=50;
    const plotW=w-marginLeft-marginRight;
    const plotH=h-marginTop-marginBottom;

    ctx.fillStyle='white';
    ctx.fillRect(0,0,w,h);

    if(!series || !series.length){
        ctx.fillStyle='black';
        ctx.font='14px Arial';
        ctx.fillText('표시할 시계열 데이터가 없습니다.',marginLeft,marginTop+20);
        return;
    }

    const values=[];
    for(const point of series){
        if(Number.isFinite(point.q)) values.push(point.q);
        if(Number.isFinite(point.p)) values.push(point.p);
    }
    if(!values.length) return;

    let vmin=Math.min(...values), vmax=Math.max(...values);
    if(vmin===vmax){
        const pad=Math.max(1,Math.abs(vmin)*0.1);
        vmin-=pad;
        vmax+=pad;
    }else{
        const pad=(vmax-vmin)*0.08;
        vmin-=pad;
        vmax+=pad;
    }

    const tmax=Math.max(1,series.length-1);
    const tx=t=>marginLeft+(t/tmax)*plotW;
    const vy=v=>marginTop+(vmax-v)/(vmax-vmin)*plotH;

    ctx.strokeStyle='black';
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(marginLeft,marginTop);
    ctx.lineTo(marginLeft,marginTop+plotH);
    ctx.lineTo(marginLeft+plotW,marginTop+plotH);
    ctx.stroke();

    ctx.font='12px Arial';
    ctx.fillStyle='black';
    ctx.textAlign='right';
    ctx.textBaseline='middle';
    for(let i=0;i<=5;i++){
        const value=vmin+(vmax-vmin)*i/5;
        const y=vy(value);
        ctx.strokeStyle='#dddddd';
        ctx.beginPath();
        ctx.moveTo(marginLeft,y);
        ctx.lineTo(marginLeft+plotW,y);
        ctx.stroke();
        ctx.fillStyle='black';
        ctx.fillText(value.toFixed(2),marginLeft-8,y);
    }

    ctx.textAlign='center';
    ctx.textBaseline='top';
    const tickCount=Math.min(10,tmax);
    for(let i=0;i<=tickCount;i++){
        const t=Math.round(tmax*i/tickCount);
        const x=tx(t);
        ctx.strokeStyle='#eeeeee';
        ctx.beginPath();
        ctx.moveTo(x,marginTop);
        ctx.lineTo(x,marginTop+plotH);
        ctx.stroke();
        ctx.fillStyle='black';
        ctx.fillText(String(t),x,marginTop+plotH+8);
    }

    ctx.font='14px Arial';
    ctx.fillStyle='black';
    ctx.fillText('시간 t',marginLeft+plotW/2,h-24);
    ctx.save();
    ctx.translate(18,marginTop+plotH/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText('값',0,0);
    ctx.restore();

    function drawSeries(key,color){
        ctx.strokeStyle=color;
        ctx.lineWidth=1.7;
        ctx.beginPath();
        let started=false;
        for(let i=0;i<series.length;i++){
            const v=series[i][key];
            if(!Number.isFinite(v)) continue;
            const x=tx(i), y=vy(v);
            if(!started){
                ctx.moveTo(x,y);
                started=true;
            }else{
                ctx.lineTo(x,y);
            }
        }
        ctx.stroke();
    }

    drawSeries('q','green');
    drawSeries('p','purple');

    ctx.textAlign='left';
    ctx.textBaseline='alphabetic';
    ctx.font='14px Arial';
    ctx.fillStyle='black';
    ctx.fillText('시간별 수량·가격 변화',marginLeft,20);
    ctx.fillStyle='green';
    ctx.fillText('Q(t) 수량',marginLeft+190,20);
    ctx.fillStyle='purple';
    ctx.fillText('P(t) 가격',marginLeft+280,20);
    ctx.fillStyle='black';
}

function cobweb(){
    const xmin=glob.xmin, ymin=glob.ymin, xmax=glob.xmax, ymax=glob.ymax;
    const iters=Math.max(0,Math.floor(glob.iters));
    const graph=glob.graph;
    const demand=glob.execFunc;
    const initialQ=glob.x1;
    let x1=initialQ;
    let y1=demand(x1);
    const series=[];

    if(Number.isFinite(x1) && Number.isFinite(y1)){
        series.push({q:x1,p:y1});
    }
    if(!Number.isFinite(y1)){
        plotTimeSeries(series);
        return;
    }

    graph.plotLine3(x1,Math.max(0,ymin),x1,y1);

    let branchSwitches=0;
    let validIterations=0;
    let previousRootIndex=null;

    for(let i=0;i<iters;i++){
        const roots=inverseSupplyRoots(y1);
        const x2=chooseBranch(roots,x1);
        if(!Number.isFinite(x2)) break;
        const rootIndex=roots.findIndex(r=>Math.abs(r-x2)<1e-6);
        if(previousRootIndex!==null && rootIndex!==previousRootIndex) branchSwitches++;
        previousRootIndex=rootIndex;

        const y2=demand(x2);
        if(!Number.isFinite(y2)) break;
        if(x2<xmin || x2>xmax || y1<ymin || y1>ymax || y2<ymin || y2>ymax) break;

        graph.plotLine3(x1,y1,x2,y1);
        graph.plotLine3(x2,y1,x2,y2);

        x1=x2;
        y1=y2;
        series.push({q:x1,p:y1});
        validIterations++;
    }

    glob.x1=x1;
    plotTimeSeries(series);
    updateChaosStatus(initialQ,validIterations,branchSwitches);
}

function clearCont(){ plotFn(); }


function plotFn(){
    glob.graph.plotFunction(glob.execFunc);
    glob.graph.plotFunction2(glob.execFunc2);
    glob.graph.axes();
}


function prepareGraph(drawCobweb){
    const startTime=Date.now();
    formToGlob();
    globToHash();
    glob.execFunc=parseFunction(glob.func);
    glob.execFunc2=parseFunction(glob.func2);
    const canvas=get('canvas');
    const graph=new Graph(canvas);
    graph.resetCanvas();
    glob.graph=graph;
    plotFn();
    if(drawCobweb) cobweb();
    log('Diagram generated in '+(Date.now()-startTime)+' milliseconds.');
}


function generate(){ prepareGraph(false); plotTimeSeries([]); }
function generate2(){ prepareGraph(true); }