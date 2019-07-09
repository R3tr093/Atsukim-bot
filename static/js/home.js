var d = new Date();



var y = d.getFullYear()

var day = d.getDate();

var month = d.getMonth();


var event = new Date(Date.UTC(y, month,day, 0, 0, 0));

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

var meet = event.toLocaleDateString('fr-FR', options);

document.getElementById("date").value = meet;

console.log(meet)
