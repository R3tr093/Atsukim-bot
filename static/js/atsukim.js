// Animate atsukimBubbles

var b1 = document.getElementById('c1')
var b2 = document.getElementById('c2')
var b3 = document.getElementById('c3')
var b4 = document.getElementById('c4')
var b5 = document.getElementById('c5')
var b6 = document.getElementById('c6')
var b7 = document.getElementById('c7')
var b8 = document.getElementById('c8')




// An animation move from top to bot
function myMove(param,param2,param3,param4) {
  var elem = param;
  var pos = param3;
  var pos2 = param4;
  var opacity = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == param2) {
      clearInterval(id);
        elem.style.opacity = 1;

    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos2 + 'px';
      elem.style.height = pos / 3 + 'px';
      elem.style.width = pos / 3 + "px";
      elem.style.lineHeight = pos / 3 + "px";
      elem.style.fontSize = pos / 15 + "px";
        elem.style.opacity = opacity + 0.8;

    }
  }
}

// An animation move from bot to top
function myMove2(paramTop,paramLeft,element,speed) {
  var elem = element;
  var pos = 1300;
  var opacity = 0;
  var id = setInterval(frame, speed);
  function frame() {
    if (pos == paramTop) {
      clearInterval(id);
        elem.style.opacity = 1;
    } else {
      pos--;
        elem.style.top = pos + 'px';
        elem.style.left = pos  / paramLeft + 'px';
        elem.style.height = pos / 3 + 'px';
        elem.style.width = pos / 3 + "px";
        elem.style.lineHeight = pos / 3 + "px";
        elem.style.fontSize = pos / 15 + "px";
        elem.style.opacity = opacity + 0.8;
    }
  }
}

function myMove3(param) {
  var elem = param
  var pos = 1300;
  var pos2 = 200;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
      elem.style.opacity = 1;
    } else {
      pos--;
      pos2++;
      elem.style.top = pos + 'px';
      elem.style.left = pos2 + 'px';
      elem.style.height = pos / 3 + 'px';
      elem.style.width = pos / 3 + "px";
      elem.style.lineHeight = pos / 3 + "px";
      elem.style.fontSize = pos / 15 + "px";
      elem.style.opacity = 0.8;
    }
  }
}




setTimeout(function(){
  myMove(b3,300,0,50);

},1000)



setTimeout(function(){
  myMove(b3,300,0,50);

},1000)

setTimeout(function(){
   myMove2(350,1.5,c5,10);
},1000)

setTimeout(function(){
  myMove(b2,400,0,700);
},2300)

setTimeout(function(){
   myMove2(550,0.65,b6,15);
},1800)

setTimeout(function(){
   myMove2(430,0,b8,15);
},0800)

setTimeout(function(){
  myMove(b4,500,0,300);
},3300)


setTimeout(function(){

  myMove3(b7)

},2400)

setTimeout(function(){
  myMove(b1,600,0,1200);
},4500)
