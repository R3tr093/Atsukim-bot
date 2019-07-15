var crossElts = document.getElementsByClassName('cross');

for (var i = 0; i < crossElts.length; i++) {
  crossElts[i].href = 'todo/supprimer/' + String(i);
}
