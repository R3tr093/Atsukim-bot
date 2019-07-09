// # BREAK  -- > dependencies

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var fs = require('fs');



var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/static/img/atsukim.png'));







// # BREAK -- > roots

// - > Prepare morning or evening

var d = new Date();

var h = d.getHours();

var m = d.getMinutes();


var text = ""

// Renvoie bonjour ou bonsoir selon l'heure.

if (h >= 17)
    {
         text = " Bonsoir ! "
    }
if (h < 17)
    {
         text = " Bonjour ! "
    }


    // # BREAK -- > JSON DATA

    var userdata = fs.readFileSync('user.json');
    var data = JSON.parse(userdata);

    var user = data.name;
    var userPass = data.pass;


// -- > BREAK  La page home

app.get('/home',function(req,res){

    res.setHeader('Content-Type', 'text/html');

     res.render('home.pug', {timed: text});

     res.end();

});


//  Check le formulaire et redirige
app.post('/home',function(req,res){

     var pass= req.body.pass.toLowerCase();
     var name= req.body.user.toLowerCase();

     if(pass === userPass && user.toLowerCase() === name)
     {
         console.log('Bonjour ' + user + ' Connexion validé.');


        // = > BREAK set meet date anniversary
        if(data.init === "faux")
        {
          var meetDate = req.body.date;
          data.meetDate = meetDate;
          res.redirect('/config');

        }

        else
         {
           res.redirect('/nowhere');
         }
     }

     else
     {
          console.log(pass + " / " + userPass)

         console.log(user.toLowerCase() + " / " + name)

          res.render('home.pug', {timed: text, err: "Mot de passe invalide"});
     }
});

app.get('/config',function(req,res){

  var userdata = fs.readFileSync('user.json');
  var data = JSON.parse(userdata);
  var init = data.init;

   if(init === "faux")
  {


     data = JSON.stringify(data);

     fs.writeFileSync('user.json',data);
     fs.writeFileSync('user2.json', data);

     res.setHeader('Content-Type', 'text/html');

     res.render('config.pug', {user: user});

     res.end();

   }

   else
   {
      res.redirect('/nowhere');
   }

});

//  Check le formulaire et redirige
app.post('/config',function(req,res){

        var userdata = fs.readFileSync('user.json');
        var data = JSON.parse(userdata);
        var init = data.init;
        var user = data.name;
        var pass = data.pass;
        var newPass = req.body.pass;
        newPass = newPass.toLowerCase();

         data.name = req.body.user;
         data.pass = newPass;
         data.init = "vrai";

         data = JSON.stringify(data);

         fs.writeFileSync('user.json',data);
         fs.writeFileSync('user2.json', data);

          res.redirect('/nowhere');




});





app.use(morgan('combined'))
.use(express.static(__dirname + '/static')) // Indique que le dossier /static contient des fichiers statiques

/// -- > BREAK gère l'erreur  404

app.use(function(req,res,next){

    res.setHeader('Content-Type', 'text/html')

   res.render('404.pug')

    res.status(404);

    res.end();

})

app.listen(8080);
