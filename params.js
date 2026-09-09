// params.js
// Automatically load and save parameters via the URL hash.


const defaultParams={
    xmin:0,ymin:0,
    xmax:5,ymax:5,
    x1:0.5,
    iters:100,
    func:'3-0.2*x**2',
    func2:'3+Math.atan(1.3*x-3)',
    branch:'nearest',
    rootSamples:1200
};


function getHashParams(){
    const raw=window.location.hash.slice(1);
    if(!raw) return {};
    return JSON.parse(decodeURIComponent(raw));
}


function setHashParams(params){
    const hash=encodeURIComponent(JSON.stringify(params));
    history.replaceState(null,'',window.location.pathname+window.location.search+'#'+hash);
}


window.onhashchange=loadParams;


function loadParams(){
    const params={...defaultParams};
    try{
        const hashParams=getHashParams();
        for(const key of Object.keys(params)){
            if(Object.prototype.hasOwnProperty.call(hashParams,key)) params[key]=hashParams[key];
        }
    }catch(e){
        log('Error getting params from URL hash: '+e);
        log('Using defaults instead.');
    }
    mapToForm(params);
    generate2();
}


const formVars=['xmin','xmax','ymin','ymax','x1','iters','func','func2','branch','rootSamples'];


function formToGlob(){
    for(const v of formVars){
        const element=get(v);
        if(!element) continue;
        glob[v]=getValue(v);
        if(v!=='func' && v!=='func2' && v!=='branch' && glob[v]!=='' && !Number.isNaN(Number(glob[v]))) glob[v]=Number(glob[v]);
    }
}


function mapToForm(map){
    for(const [key,value] of Object.entries(map)) setValue(key,value);
}


function setValue(name,value){
    const elt=document.getElementById(name);
    if(elt!==null) elt.value=value;
}


function get(name){ return document.getElementById(name); }
function getValue(name){ return get(name).value; }


function globToHash(){
    const params={};
    for(const param of formVars) params[param]=glob[param];
    setHashParams(params);
}


loadParams();