class GameController {
  constructor() {
    // === Server tick config ===
    this.SERVER_TICK_RATE = 20;
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    // Bind loop
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);

    // === Game state ===
    this.game = new Game();

    // === Player info ===
    this.name = localStorage.getItem("name");
    this.serverUrl = "ws://localhost:8000/ws";
    this.spritePath = localStorage.getItem("spritePath");

    // === Input state ===
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    // === WebSocket ===
    this.socket = new WebSocket(this.serverUrl);
    this.initSocket();

    // === Input handling ===
    this.initInput();

    // === Send inputs to backend ===
    this.startInputSender();
  }

  // ================= SOCKET =================
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
      const gameStateFromServer = JSON.parse(e.data);
      console.log("Snapshot reçu :", gameStateFromServer);
      this.game.update(gameStateFromServer);
    };
  }

  // ================= INPUT =================
  initInput() {
    window.addEventListener("keydown", (e) => {
      this.updateInputState(e.key, true);
      console.log(this.inputState);
    });

    window.addEventListener("keyup", (e) => {
      this.updateInputState(e.key, false);
      console.log(this.inputState);
    });
  }

  updateInputState(key, value) {
    if (key === "z") this.inputState.up = value;
    if (key === "s") this.inputState.down = value;
    if (key === "q") this.inputState.left = value;
    if (key === "d") this.inputState.right = value;
    if (key === " ") this.inputState.attack = value;
  }

  // ================= SEND INPUTS =================
  startInputSender() {
    setInterval(() => {
      if (this.socket.readyState !== WebSocket.OPEN) return;

      this.socket.send(
        JSON.stringify({
          type: "input",
          input: this.inputState,
        }),
      );
    }, this.SERVER_INTERVAL);
  }

  // ================= GAME LOOP =================
  loop(timestamp) {
    // Pour tests uniquement
    // console.log(this.game.players);

    requestAnimationFrame(this.loop);
  }
}

// === Start game ===
const myGame = new GameController();
