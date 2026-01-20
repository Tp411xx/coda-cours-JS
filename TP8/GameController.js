class GameController {
  constructor() {
    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);
    this.game = new Game();
    this.name = localStorage.getItem("name");
    this.serverUrl = "ws://localhost:8000/ws";
    //this.serverUrl = localStorage.getItem("serverUrl");
    this.spritePath = localStorage.getItem("spritePath");
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    this.socket = new WebSocket(this.serverUrl);
    this.initSocket();
    this.initInput();
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("Connexion ouverte !");
      this.socket.send(
        JSON.stringify({
          name: this.name,
          skinPath: this.spritePath,
        }),
      );
    };
    this.socket.onmessage = (e) => {
      console.log("Message reçu !");
      const new_message = JSON.parse(e.data);
      this.game.update(new_message);
    };
  }
  initInput() {
    this.Touche = "";
    window.addEventListener("keydown", (e) => {
      this.Touche = e.key;
      console.log(this.Touche);
    });

    window.addEventListener("keyup", (e) => {
      this.Touche = e.key;
    });
  }

  // === Main render loop ===
  loop(timestamp) {
    // Request the next frame
    requestAnimationFrame(this.loop);
  }
}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
const myGame = new GameController();
