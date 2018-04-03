// params.js
// Automatically load and save parameters via the URL

var defaultParams={
    xmin:0,ymin:0,
    xmax:5,ymax:5,
    x1:0.5,
    iters:100,
    func:'3-0.2*Math.pow(x,2)',
    func2:'3+Math.atan(1.3*x-3)',
    func3:'(Math.tan(x-3)+3)/1.3'
}

// Get parameters from the URL's hash. ?) file:///storage/emulated/0/workspace/javascript/cobweb/cobweb9-1.html#{%22xmin%22:0,%22xmax%22:10,%22ymin%22:0,%22ymax%22:10,%22x1%22:0.1,%22iters%22:100,%22func%22:%225-0.9*x%22,%22func2%22:%221+1.1*x%22,%22func3%22:%22(x-1)/1.1%22}
// hash는 url의 #부분을 의미.
function getHashParams(){
    return JSON.parse(decodeURI(window.location.hash).slice(1));
}

// Set parameters to the URL's hash, without window.onhashchange activating.
// Example: setHashParams({foo:"bar",baz:'quux'});
function setHashParams(params){
    var oldFn=window.onhashchange;
    window.onhashchange=function(){};
    window.location.hash=JSON.stringify(params);
    window.onhashchange=oldFn;
}

window.onhashchange=loadParams; //  url hash가 변하면 generate 함수 실행
window.onhashchange(); 

// Load parameters from URL hash
function loadParams(){
    var params=JSON.parse(JSON.stringify(defaultParams));
    try{
        var hashParams=getHashParams();
        for(i in params){
            if(hashParams[i]){ // TODO: Check if hashParams[i]==0 activates a potential bug.
                params[i]=hashParams[i];
            }
        }
    }catch(e){
        log("Error getting params from URL hash: "+e);
        log("Using defaults instead.");
    }
    log("Params are: "+JSON.stringify(params));
    mapToForm(params);
    generate2(); //  cobweb.js의 generate 함수 실행
}

var formVars=['xmin', 'xmax', 'ymin', 'ymax', 'x1', 'iters', 'func', 'func2', 'func3'];

// retrieve form inputs and save to glob
function formToGlob(){
    // get parameters by ID
    for(var i in formVars){
        var v=formVars[i];
        glob[v]=getValue(v);
        // convert to number if possible
        if(!isNaN((glob[v]))){ // NaN!=NaN and NaN!==NaN, so need isNaN()
            glob[v]=Number(glob[v]);
        }
    }
}

// copy a map object's values to the form
function mapToForm(map){
    for(var i in map){
        setValue(i,map[i]);
    }
}
// Convenience function for setting text in a text box
function setValue(name, value){
    var elt=document.getElementById(name);
    if(elt!=null){
        elt.value=value;
    }else{
        log("Can't set "+name+" to "+value+": null");
    }
}

// Convenience function for getting elements by ID.
function get(name) {
    return document.getElementById(name);
}

// Convenience function for getting text from a text box
function getValue(name){
    return get(name).value;
}

function globToHash(){
    var params={};
    for (var i in formVars){
        param=formVars[i];
        params[param]=glob[param];
    }
    setHashParams(params);
    log(window.location);
    try{
        url=get("url");
        log("url="+url);
        log("url.innerHTML="+url.innerHTML);
        get("url").innerHTML='<a href="'+window.location+'">'+window.location+'</a>';
        log(url);
    } catch(e) {
        log("Error showing URL: "+e);
    }
}

// generate(); 