// Placeholder autotype effect





// Function qui prend pour paramètre un élément du DOM ainsi qu'une chaine de caractère
function makeTypeWriter(text, el) {

// Permet de suivre le flux de l'écriture
var i = 0;

// La valeur de retour de la fonction MakeTypeWriter est un fonction ( typeWriter)
return function typeWriter() {

// Tant que on n'as pas atteint la valeur max de la chaine de caractére on écris
  if (i < text.length)
{
  el.innerHTML += text.charAt(i);
  i++;

 // On rappel cette fonction toute les (0035 ms ou valeur par défaut de la variable speed)
  setTimeout(typeWriter,  Math.floor(Math.random() * Math.floor(150)));
}
}
}



var conf= document.getElementById('ok');
var sugg = document.getElementById('sugg');

var count = 0;

conf.addEventListener('click',function(){


 var inputElt = document.getElementById('inputElt');

 var birth = document.getElementById('birth');


    count++;

      if(inputElt.value.length > 4)
      {

            inputElt.className = 'hidden' ;
            console.log('ok')
            var userName = inputElt.value;
            document.getElementById('intro').textContent = " ";
      }

      if(count === 1)
      {



      makeTypeWriter("Oh je vois tu t'appelles " + userName + "  c'est un super nom, j'aime beaucoup ! ", document.getElementById("intro"))()


       birth.className = "ipt slideInLeft animated ";
       sugg.className ="fadeInDown animated formElts";
       sugg.textContent = " Votre date de naissance ? ";



      }

      if(count === 2)
      {


      document.getElementById("pass").value = "";
      document.getElementById("intro").textContent = " Une dernière étape, défini notre mot de passe : ";

      birth.className = "hidden";
       sugg.textContent = " Quelle est notre mot de passe  ? ";
       document.getElementById('pass').className ="ipt slideInRight animated ";
       count++;


      }

})
