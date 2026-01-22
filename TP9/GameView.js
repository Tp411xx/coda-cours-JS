class GameView {
  constructor(game) {
    this.game = game;
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  drawBackground() {
    this.ctx.fillStyle = "#312222";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  render() {
    this.clear();
    this.drawBackground();
  }
}
