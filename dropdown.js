
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function cFunction() {
    document.getElementById("cDropdown").classList.toggle("show");
}

function cpFunction() {
    document.getElementById("cpDropdown").classList.toggle("show");
}

function csFunction() {
    document.getElementById("csDropdown").classList.toggle("show");
}

function pyFunction() {
    document.getElementById("pyDropdown").classList.toggle("show");
}

function jFunction() {
    document.getElementById("jDropdown").classList.toggle("show");
}

function plFunction() {
    document.getElementById("plDropdown").classList.toggle("show");
}

function rFunction() {
    document.getElementById("rDropdown").classList.toggle("show");
}

function hFunction() {
    document.getElementById("hDropdown").classList.toggle("show");
}

function phFunction() {
    document.getElementById("phDropdown").classList.toggle("show");
}

function jsFunction() {
    document.getElementById("jsDropdown").classList.toggle("show");
}

function jqFunction() {
    document.getElementById("jqDropdown").classList.toggle("show");
}

function kFunction() {
    document.getElementById("kDropdown").classList.toggle("show");
}

function sFunction() {
    document.getElementById("sDropdown").classList.toggle("show");
}

function gFunction() {
    document.getElementById("gDropdown").classList.toggle("show");
}

function lFunction() {
    document.getElementById("lDropdown").classList.toggle("show");
}

function jlFunction() {
    document.getElementById("jlDropdown").classList.toggle("show");
}

function exFunction() {
    document.getElementById("exDropdown").classList.toggle("show");
}

function exFunction() {
    document.getElementById("exDropdown").classList.toggle("show");
}

function rsFunction() {
    document.getElementById("rsDropdown").classList.toggle("show");
}

function clFunction() {
    document.getElementById("clDropdown").classList.toggle("show");
}

function hsFunction() {
    document.getElementById("hsDropdown").classList.toggle("show");
}

function nsFunction() {
    document.getElementById("nsDropdown").classList.toggle("show");
}

function mtFunction() {
    document.getElementById("mtDropdown").classList.toggle("show");
}

function strFunction() {
    document.getElementById("strDropdown").classList.toggle("show");
}

function shFunction() {
    document.getElementById("shDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}