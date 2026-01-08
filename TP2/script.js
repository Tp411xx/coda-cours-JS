//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
  // Générer une note aléatoire entre 0 et note_maximum (inclus)
  let note = Math.floor(Math.random() * (note_maximum + 1));
  // Ajouter la note générée au tableau
  notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////
//pt1 et 2

let nombre_maxi = 0;
let nombre_mini = 20;
let indice_maxi = 0;
let indice_mini = 0;

// Adding let to declare i as a local variable
for (let i = 0; i < taille; i++) {
  if (notes[i] > nombre_maxi) {
    nombre_maxi = notes[i];
    indice_maxi = i;
  }
  // Using separate if statement to correctly update nombre_mini
  if (notes[i] < nombre_mini) {
    nombre_mini = notes[i];
    indice_mini = i;
  }
}

console.log(taille);
console.log(nombre_maxi, indice_maxi);
console.log(nombre_mini, indice_mini);
console.log(notes);

// pt3 et 4 : tri par sélection
for (let j = 0; j < notes.length; j++) {
  let nombre_mini = notes[j];
  let indice_mini = j;

  for (let i = j + 1; i < notes.length; i++) {
    if (notes[i] < nombre_mini) {
      nombre_mini = notes[i];
      indice_mini = i;
    }
  }

  // échange
  let nombre_en_stock = notes[j];
  notes[j] = notes[indice_mini];
  notes[indice_mini] = nombre_en_stock;
}

console.log(notes);
