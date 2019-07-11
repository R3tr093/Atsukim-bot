// # BREAK  -- > dependencies

var express = require('express');
var morgan = require('morgan');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var fs = require('fs');



var app = express();


var urlencodedParser = bodyParser.urlencoded({ extended: false });


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))


/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})



/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) {
    var test = 'test';
    res.render('test.pug', {todolist: req.session.todolist});
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})




// # BREAK -- > roots

// - > Prepare morning or evening
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/static/img/atsukim.png'));

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
  var userdata = fs.readFileSync('user.json');
  var data = JSON.parse(userdata);

  var user = data.name;
  var userPass = data.pass;

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
           res.redirect('/atsukim');
         }
     }

     else
     {
          console.log(pass + " / " + userPass)

         console.log(user.toLowerCase() + " / " + name)

          res.render('home.pug', {timed: text, err: "Mot de passe invalide"});
     }
});

// # BREAK  -> Go to config phase

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
      res.redirect('/atsukim');
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

          res.redirect('/atsukim');




});


// # BREAK -> got to Atsukim main

app.get('/atsukim',function(req,res){

    res.setHeader('Content-Type', 'text/html');
    var userdata = fs.readFileSync('user.json');
    var data = JSON.parse(userdata);

    console.log(user)
    var user = data.name;

     res.render('atsukim.pug', {user: user});

     res.end();

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
