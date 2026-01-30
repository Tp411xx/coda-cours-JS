export default class GameView {
  constructor(game) {
    this.game = game;
    // console.log("liste players", this.game.players);
    //récupération de l'élément canvas
    this.canvas = document.getElementById("canvas");
    //récupération des dimentions canvas
    this.canvas.height = 800;
    this.canvas.width = 800;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.canvas.style.border = "2px solid red";
    //récupération du context canvas
    this.ctx = this.canvas.getContext("2d");
    //chargement de spritesheet
    this.img = new Image();
    //récupérer skinPath dans le localStorage
    this.skinPath = localStorage.getItem("skinPath");

    this.img.src = this.skinPath;
    console.log(this.skinPath);

    console.log("GameView instancié");
  }

  drawHUD(player, x, y) {
    const barWidth = 40;
    // On centre par rapport aux 64px du joueur
    const centerX = x + 32;
    const barX = x + (64 - barWidth) / 2;

    // Barre de vie
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(barX, y - 15, barWidth, 5);
    this.ctx.fillStyle = "#00FF00";
    this.ctx.fillRect(barX, y - 15, (player.hp / player.maxHp) * barWidth, 5);

    // Pseudo
    this.ctx.fillStyle = "white";
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`${player.name} (Lvl ${player.lvl})`, centerX, y - 22);
  }
  //Nettoie le canvas
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  //Dessine le fond
  drawBackground() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = "#982020";
    this.ctx.lineWidth = 10;
    this.ctx.strokeRect(0, 0, this.width, this.height);
  }
  drawPlayer(player) {
    //l'image est prête ?
    if (!player.imageLoaded) return;

    // les variables
    let sx, sy, sw, sh;
    let dx, dy, dw, dh;

    const directionToRow = {
      0: 8,
      1: 11,
      2: 10,
      3: 9,
    };

    const dWidth = 64;
    const dHeight = 64;

    // Calcul des positions
    dx = player.renderX * (player.renderX <= 1 ? this.canvas.width : 1);
    dy = player.renderY * (player.renderY <= 1 ? this.canvas.height : 1);
    dw = dWidth;
    dh = dHeight;

    // Calcul des coordonnées
    if (
      player.isAttacking ||
      player.currentAttackSpriteStep > 0 ||
      player.attackSpriteIndex > 0
    ) {
      sw = 192;
      sh = 192;
      const attackRowMap = { 0: 18, 1: 21, 2: 20, 3: 19 };
      let attackRow = attackRowMap[player.direction] || 21;

      sx = player.attackSpriteIndex * sw;
      sy = attackRow * sh;

      dx -= 64;
      dy -= 64;
      dw = 192;
      dh = 192;
    } else {
      sw = 64;
      sh = 64;
      sx = player.walkSpriteIndex * sw;
      sy = directionToRow[player.direction] * sh;
    }

    this.ctx.drawImage(player.image, sx, sy, sw, sh, dx, dy, dw, dh);

    // On recalcule la position "standard" sans le décalage de l'attaque
    const hudX = player.renderX * (player.renderX <= 1 ? this.canvas.width : 1);
    const hudY =
      player.renderY * (player.renderY <= 1 ? this.canvas.height : 1);

    // On envoie ces coordonnées fixes à la barre d'interface
    this.drawHUD(player, hudX, hudY);
  }

  //Nettoie le canvas + Dessine le fond
  render() {
    this.clear();
    this.drawBackground();

    //boucle pour parcourir tout les joueurs et les afficher
    //debugger;
    for (let id in this.game.players) {
      const player = this.game.players[id];

      //les animations des joueurs
      this.drawPlayer(player);
      player.animate();
    }
  }
}
