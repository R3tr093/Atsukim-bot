// Set the clock
function setClock ()
{
  var d = new Date();

  var hour = d.getHours();

  var min = d.getMinutes();

  if(hour < 10)
  {
    hour = "0" + String(hour);
  }

  if(min < 10)
  {
    min = "0" + String(min);
  }


  var clock = document.getElementById("clock");

   clock.textContent = String(hour) + ":" + String(min);
}

setClock();

setInterval(setClock,1000)


// Animate atsukimBubbles

var b1 = document.getElementById('c1')
var b2 = document.getElementById('c2')
var b3 = document.getElementById('c3')
var b4 = document.getElementById('c4')



function myMove(param,param2,param3,param4) {
  var elem = param;
  var pos = param3;
  var pos2 = param4;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == param2) {
      clearInterval(id);

    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos2 + 'px';
      elem.style.height = pos / 3 + 'px';
      elem.style.width = pos / 3 + "px";
      elem.style.lineHeight = pos / 3 + "px";
      elem.style.fontSize = pos / 15 + "px";
      elem.style.opacity = 1;

    }
  }
}

setTimeout(function(){
  myMove(b3,300,0,50);

},1000)

setTimeout(function(){
  myMove(b2,400,0,700);
},2300)

setTimeout(function(){
  myMove(b4,500,0,300);
},3300)

setTimeout(function(){
  myMove(b1,600,0,1200);
},4500)
