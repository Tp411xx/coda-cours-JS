// pt1
const classe = "1T3";
let nb_eleves = 35;
ouverte = true;

console.log(classe);
console.log(nb_eleves);
console.log(ouverte);

//pt2
let eleve = {
  prenom: "Thomas",
  note_math: 13,
  note_français: 15,
};

console.log(eleve.prenom);

//tp3
let eleve1 = {
  prenom: "Thomas",
  note_math: 5,
  note_français: 9,
  moyenne: (5 + 9) / 2,
};
let eleve2 = {
  prenom: "Pierre",
  note_math: 18,
  note_français: 15,
  moyenne: (18 + 20) / 2,
};
let eleve3 = {
  prenom: "Gabriel",
  note_math: 13,
  note_français: 17,
  moyenne: (13 + 17) / 2,
};

let eleves = [eleve1, eleve2, eleve3];

for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom);
}

//tp4
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom);
  console.log(eleves[i].moyenne);
}

//tp5 et 6
for (let i = 0; i < eleves.length; i++) {
  console.log(eleves[i].prenom);
  if (eleves[i].moyenne >= 10) {
    if (eleves[i].moyenne >= 16) {
      eleves[i].moyenne = eleves[i].moyenne + " Admis Mention très bien";
    } else if (eleves[i].moyenne >= 14) {
      eleves[i].moyenne = eleves[i].moyenne + " Admis Mention bien";
    } else if (eleves[i].moyenne >= 12) {
      eleves[i].moyenne = eleves[i].moyenne + " Admis Mention Assez bien";
    } else {
      eleves[i].moyenne = eleves[i].moyenne + " Admis Mention Passable";
    }
  } else {
    eleves[i].moyenne = eleves[i].moyenne + " Refusé" + " Insuffisant";
  }
  console.log(eleves[i].moyenne);
}

//tp7
let i = 0;
let admis = 0;
while (i < eleves.length) {
  if (eleves[i].moyenne >= 10) {
    let admis = admis + 1;
  }
  i++;
}
console.log(eleves[i].moyenne);
