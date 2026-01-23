class GameView {
  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById("canvas-feur");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.SPRITE_SIZE = 64;

    this.spritePath = localStorage.getItem("skinPath");
    this.sprite = new Image();
    this.sprite.src = this.spritePath;
    this.frame = 0;
    this.frameDelay = 0;
    this.row = 0;
  }

  drawBackground() {
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = "#982020";
    this.ctx.lineWidth = 10;
    this.ctx.strokeRect(0, 0, this.width, this.height);
  }

  drawPlayer(player) {
    // coordonnées normalisées → canvas
    const x = player.renderX * this.width;
    const y = player.renderY * this.height;

    // mise à jour du sprite
    player.animate();

    if (player.isWalking) {
      if (player.directions === directions.north) {
        this.row = 9;
      }
      if (player.directions === directions.west) {
        this.row = 10;
      }
      if (player.directions === directions.south) {
        this.row = 11;
      }
      if (player.directions === directions.east) {
        this.row = 12;
      }
    } else if (
      player.isAttacking ||
      player.currentAttackSpriteStep > 0 ||
      player.attackSpriteIndex > 0
    ) {
      if (player.directions === directions.north) {
        this.row = 19;
      }
      if (player.directions === directions.west) {
        this.row = 20;
      }
      if (player.directions === directions.south) {
        this.row = 21;
      }
      if (player.directions === directions.east) {
        this.row = 22;
      }
    } else if (
      player.isDying ||
      player.currentDeathSpriteStep > 0 ||
      player.deathSpriteIndex > 0
    ) {
      this.row = 20;
    } else {
      this.row = 11;
    }
    this.frameDelay++;

    if (this.frameDelay > 6) {
      this.frame = (this.frame + 1) % 9;
      this.frameDelay = 0;
    }

    this.ctx.drawImage(
      this.sprite,
      this.frame * this.SPRITE_SIZE,
      this.row * this.SPRITE_SIZE,
      this.SPRITE_SIZE,
      this.SPRITE_SIZE,
      x,
      y,
      this.SPRITE_SIZE,
      this.SPRITE_SIZE,
    );
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackground();

    for (const id in this.game.players) {
      this.drawPlayer(this.game.players[id]);
    }
  }
}
