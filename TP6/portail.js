const portal = document.querySelector(".portal");
const inputs = portal.querySelectorAll("input");
const button = portal.querySelector("button");

const pseudoInput = inputs[0];
const serverInput = inputs[1];

const SPRITE_SIZE = 64;
const SPRITE_ROW = 10; // ligne 10
const SPRITE_COL = 0; // colonne 0

// Message erreur
const errorMsg = document.createElement("p");
errorMsg.className = "error-msg";
portal.insertBefore(errorMsg, button);

// Conteneur skins
const skinsContainer = document.createElement("div");
skinsContainer.className = "skins-container";
portal.insertBefore(skinsContainer, errorMsg);

let selectedSkin = null;

// ===============================
// Chargement spritesheets
// ===============================
for (let i = 1; i <= 29; i++) {
  const wrapper = document.createElement("div");
  wrapper.className = "skin-wrapper";

  const canvas = document.createElement("canvas");
  canvas.width = SPRITE_SIZE;
  canvas.height = SPRITE_SIZE;

  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = `assets/${i}.png`;

  img.onload = () => {
    const sx = SPRITE_COL * SPRITE_SIZE;
    const sy = SPRITE_ROW * SPRITE_SIZE;

    ctx.drawImage(
      img,
      sx,
      sy,
      SPRITE_SIZE,
      SPRITE_SIZE,
      0,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  };

  img.onerror = () => {
    console.error(`Erreur de chargement: assets/${i}.png`);
    ctx.fillStyle = "#f00";
    ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText("X", SPRITE_SIZE / 2, SPRITE_SIZE / 2);
  };

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Fonction pour sélectionner un skin
  const selectSkin = () => {
    // Désélectionner tous les autres
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((cb) => (cb.checked = false));
    document
      .querySelectorAll("canvas")
      .forEach((c) => c.classList.remove("selected"));

    // Sélectionner celui-ci
    checkbox.checked = true;
    canvas.classList.add("selected");

    selectedSkin = {
      path: `assets/${i}.png`,
      row: SPRITE_ROW,
      col: SPRITE_COL,
    };
  };

  // Events
  checkbox.addEventListener("change", selectSkin);
  canvas.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
      selectSkin();
    } else {
      canvas.classList.remove("selected");
      selectedSkin = null;
    }
  });

  wrapper.appendChild(canvas);
  wrapper.appendChild(checkbox);
  skinsContainer.appendChild(wrapper);
}

// ===============================
// Validation + localStorage
// ===============================
button.addEventListener("click", () => {
  errorMsg.textContent = "";
  errorMsg.className = "error-msg";

  if (!pseudoInput.value || !serverInput.value || !selectedSkin) {
    errorMsg.textContent = "⚠ Tous les champs sont obligatoires + un skin";
    return;
  }

  localStorage.setItem("pseudo", pseudoInput.value);
  localStorage.setItem("serverUrl", serverInput.value);
  localStorage.setItem("skinPath", selectedSkin.path);
  localStorage.setItem("skinRow", selectedSkin.row);
  localStorage.setItem("skinCol", selectedSkin.col);

  errorMsg.className = "error-msg success";
  errorMsg.textContent = "✓ Skin enregistré !";
});

// ===============================
// Particules au mouvement de souris
// ===============================
let particleTimeout;
document.addEventListener("mousemove", (e) => {
  clearTimeout(particleTimeout);
  particleTimeout = setTimeout(() => {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: #555;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      opacity: 0.5;
    `;
    document.body.appendChild(particle);

    setTimeout(() => {
      particle.style.transition = "all 1s";
      particle.style.opacity = "0";
      particle.style.transform = "scale(3)";
    }, 10);

    setTimeout(() => particle.remove(), 1000);
  }, 50);
});

// ===============================
// Particules de fond
// ===============================
for (let i = 0; i < 4; i++) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = `${20 + i * 20}%`;
  particle.style.animationDelay = `${i * 3}s`;
  document.body.appendChild(particle);
}
