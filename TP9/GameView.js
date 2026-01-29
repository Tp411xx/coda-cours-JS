class GameView {
  constructor(game) {
    this.game = game;
    // console.log("liste players", this.game.players);
    //récupération de l'élément canvas
    this.canvas = document.getElementById("canvas");
    //récupération des dimentions canvas
    this.canvas.height = 500;
    this.canvas.width = 800;

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    //mettre bordure pour la visibilité du canvas
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
    // Charger l'image si nécessaire
    if (!player.img) {
      player.img = new Image();
      player.img.src = player.skinPath;
    }

    //ws://10.43.31.53:8000/ws
    // Dimensions des sprites
    const sWidth = 64;
    const sHeight = 64;
    const sWidthAttack = 192; //128 ou 192
    const sHeightAttack = 192;
    const dWidthAttack = 192; //128 ou 192
    const dHeightAttack = 192;

    // Dimensions de rendu sur canvas (toujours 64x64 pour la taille du joueur)
    const dWidth = 64;
    const dHeight = 64;

    // Coordonnées de rendu du joueur sur le canvas
    const dx = player.renderX * this.canvas.width;
    const dy = player.renderY * this.canvas.height;

    // --- ATTACK ---
    if (
      player.isAttacking ||
      player.currentAttackSpriteStep > 0 ||
      player.attackSpriteIndex > 0
    ) {
      const dxAttack = player.renderX * this.canvas.width - 64;
      const dyAttack = player.renderY * this.canvas.height - 64;
      // Coordonnées dans la sprite sheet
      const sx = player.attackSpriteIndex * sWidthAttack;
      //sy = la ligne de l'attaque + les 54frames normales au dessus de la hauteur dHeight
      const sy = 54 * dHeight + player.attackRowIndex * sHeightAttack;
      this.ctx.drawImage(
        player.img,
        sx,
        sy,
        sWidthAttack,
        sHeightAttack, // source
        dxAttack,
        dyAttack,
        dWidthAttack,
        dHeightAttack, // destination
      );
    }
    // --- WALK / IDLE ---
    else {
      const sx = player.walkSpriteIndex * sWidth;
      const sy = player.walkRowIndex * sHeight;

      this.ctx.drawImage(
        player.img,
        sx,
        sy,
        sWidth,
        sHeight, // source
        dx,
        dy,
        dWidth,
        dHeight, // destination
      );
    }
  }
  //boucle pour parcourir tout les joueurs et les afficher
  render() {
    this.drawBackground();
    console.log("-------------------");

    //boucle pour parcourir tout les joueurs et les afficher
    console.log(this.game.players);
    //debugger;
    for (let id in this.game.players) {
      const player = this.game.players[id];
      console.log("ça marche pas");

      //les animations des joueurs
      this.drawPlayer(player);
      player.animate();
    }
    console.log("=============");
  }
}
