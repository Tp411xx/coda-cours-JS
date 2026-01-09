/////////////////////// TP 3 – Utilisation d’Objets ///////////////////////

// -------------------- Paramètres --------------------
let taille_minimum = 7;
let taille_maximum = 10;
let note_maximum = 20;

const prenoms = [
  "Lucas",
  "Emma",
  "Noah",
  "Chloé",
  "Hugo",
  "Léa",
  "Nathan",
  "Camille",
  "Louis",
  "Sarah",
];

let eleves = [];

// -------------------- PARTIE 1 : Génération des élèves --------------------

// Taille aléatoire du tableau
let nbEleves =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Création des élèves
for (let i = 0; i < nbEleves; i++) {
  let eleve = {
    prenom: prenoms[Math.floor(Math.random() * prenoms.length)],
    noteFrancais: Math.floor(Math.random() * (note_maximum + 1)),
    noteMaths: Math.floor(Math.random() * (note_maximum + 1)),
    noteHistoire: Math.floor(Math.random() * (note_maximum + 1)),
    moyenne: 0,
  };

  eleve.moyenne =
    (eleve.noteFrancais + eleve.noteMaths + eleve.noteHistoire) / 3;

  eleves.push(eleve);
}

// Affichage des élèves
console.log("Élèves générés :");
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom, "-", eleves[i].moyenne.toFixed(2));
}

// -------------------- PARTIE 2 : Étude des valeurs --------------------

console.log("Nombre total d'élèves :", eleves.length);

let min = eleves[0].moyenne;
let max = eleves[0].moyenne;

for (let i = 1; i < eleves.length; i++) {
  if (eleves[i].moyenne < min) min = eleves[i].moyenne;
  if (eleves[i].moyenne > max) max = eleves[i].moyenne;
}

console.log("Plus petite moyenne :", min.toFixed(2));
console.log("Plus grande moyenne :", max.toFixed(2));

// -------------------- PARTIE 3 : Recherche de l’indice --------------------

let indiceMin = 0;

for (let i = 1; i < eleves.length; i++) {
  if (eleves[i].moyenne < eleves[indiceMin].moyenne) {
    indiceMin = i;
  }
}

console.log(
  "Élève avec la plus petite moyenne :",
  eleves[indiceMin].prenom,
  "-",
  eleves[indiceMin].moyenne.toFixed(2),
  "Indice :",
  indiceMin
);

// -------------------- PARTIE 4 : Échange --------------------

let temp = eleves[0];
eleves[0] = eleves[indiceMin];
eleves[indiceMin] = temp;

console.log("Tableau après échange :");
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom, "-", eleves[i].moyenne.toFixed(2));
}

// -------------------- PARTIE 5 : Tri par sélection --------------------

let comparaisons = 0;
let echanges = 0;

for (let i = 0; i < eleves.length - 1; i++) {
  let indiceMin = i;

  for (let j = i + 1; j < eleves.length; j++) {
    comparaisons++;
    if (eleves[j].moyenne < eleves[indiceMin].moyenne) {
      indiceMin = j;
    }
  }

  if (indiceMin !== i) {
    let temp = eleves[i];
    eleves[i] = eleves[indiceMin];
    eleves[indiceMin] = temp;
    echanges++;
  }
}

// -------------------- PARTIE 6 : Affichage du résultat --------------------

console.log("Tableau trié par moyenne croissante :");
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom, "-", eleves[i].moyenne.toFixed(2));
}

console.log("Nombre de comparaisons :", comparaisons);
console.log("Nombre d'échanges :", echanges);

// -------------------- BONUS : Tri par note de Mathématiques --------------------

for (let i = 0; i < eleves.length - 1; i++) {
  let indiceMin = i;

  for (let j = i + 1; j < eleves.length; j++) {
    if (eleves[j].noteMaths < eleves[indiceMin].noteMaths) {
      indiceMin = j;
    }
  }

  if (indiceMin !== i) {
    let temp = eleves[i];
    eleves[i] = eleves[indiceMin];
    eleves[indiceMin] = temp;
  }
}

console.log("Tableau trié par note de Mathématiques :");
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom, "- Note Maths :", eleves[i].noteMaths);
}
