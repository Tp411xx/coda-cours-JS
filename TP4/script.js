/////////////////////// TP 4 – Utilisation de fonctions ///////////////////////

// -------------------- Paramètres globaux --------------------
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

// -------------------- PARTIE 1 : genererEleves --------------------
function genererEleves() {
  let eleves = [];

  let nbEleves =
    Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
    taille_minimum;

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

  return eleves;
}

// -------------------- PARTIE 2 : afficherEleves --------------------
function afficherEleves(eleves) {
  for (let i = 0; i < eleves.length; i++) {
    console.log(eleves[i].prenom, "-", eleves[i].moyenne.toFixed(2));
  }
}

// -------------------- PARTIE 3 : trouverMoyenneMin --------------------
function trouverMoyenneMin(eleves, indexDepart) {
  let indiceMin = indexDepart;

  for (let i = indexDepart + 1; i < eleves.length; i++) {
    if (eleves[i].moyenne < eleves[indiceMin].moyenne) {
      indiceMin = i;
    }
  }

  return indiceMin;
}

// -------------------- PARTIE 4 : afficherDonnees --------------------
function afficherDonnees(eleves) {
  console.log("Nombre total d'élèves :", eleves.length);

  let min = eleves[0].moyenne;
  let max = eleves[0].moyenne;

  for (let i = 1; i < eleves.length; i++) {
    if (eleves[i].moyenne < min) min = eleves[i].moyenne;
    if (eleves[i].moyenne > max) max = eleves[i].moyenne;
  }

  console.log("Plus petite moyenne :", min.toFixed(2));
  console.log("Plus grande moyenne :", max.toFixed(2));
}

// -------------------- PARTIE 5 : swap --------------------
function swap(eleves, indexA, indexB) {
  let temp = eleves[indexA];
  eleves[indexA] = eleves[indexB];
  eleves[indexB] = temp;
}

// -------------------- PARTIE 6 : triParSelection --------------------
function triParSelection(eleves) {
  let comparaisons = 0;
  let echanges = 0;

  for (let i = 0; i < eleves.length - 1; i++) {
    let indiceMin = trouverMoyenneMin(eleves, i);

    for (let j = i + 1; j < eleves.length; j++) {
      comparaisons++;
    }

    if (indiceMin !== i) {
      swap(eleves, i, indiceMin);
      echanges++;
    }
  }

  console.log("Nombre de comparaisons :", comparaisons);
  console.log("Nombre d'échanges :", echanges);
}

// -------------------- PARTIE 7 : Appel des fonctions --------------------
let eleves = genererEleves();

console.log("Élèves générés :");
afficherEleves(eleves);

afficherDonnees(eleves);

console.log("Tri par sélection (moyenne croissante) :");
triParSelection(eleves);
afficherEleves(eleves);
