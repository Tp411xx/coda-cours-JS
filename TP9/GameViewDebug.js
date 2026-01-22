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

    // dessin du sprite
    this.ctx.drawImage(
      this.sprite,
      0,
      10 * 64,
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
