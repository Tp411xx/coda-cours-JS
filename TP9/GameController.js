class GameController {
  constructor() {
    // Retrieve player name, server address and chosen skin from localStorage (turned in at portal)
    this.pseudo = localStorage.getItem("pseudo");
    this.serverUrl = localStorage.getItem("serverUrl");
    this.skinPath = localStorage.getItem("skinPath");

    // Create the Game instance that will store the game state (players, timer, flags)
    this.game = new Game();
    this.view = new GameView(this.game);

    // Create a new WebSocket connection to the backend server
    console.log(`ws://${this.serverUrl}/ws`);
    this.socket = new WebSocket(`ws://${this.serverUrl}/ws`);

    // Timestamp of the last server update received
    this.lastServerUpdate = performance.now();
    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    // This object represents the currently pressed keys
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };
    // All the keys are at false (unpressed) by default

    // Connect to the server
    this.initSocket();
    // Initialize keyboard events handler
    this.initInput();
    // Initialize keys states sender
    this.startInputSender();

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);
  }

  // === WebSocket initialization ===
  initSocket() {
    // Triggered when the connection is successfully opened
    this.socket.onopen = () => {
      console.log("Connected to server");

      // Send player identity to the server
      this.socket.send(
        JSON.stringify({
          name: this.pseudo,
          skinPath: this.skinPath,
        }),
      );
    };

    // Triggered when a message is received from the server
    this.socket.onmessage = (event) => {
      // Save the time of this server update (useful for interpolation)
      this.lastServerUpdate = performance.now();

      // Parse the received game state
      const gameState = JSON.parse(event.data);

      console.log(gameState);

      // Synchronize frontend game state with backend data
      this.game.update(gameState);
    };

    // Triggered when the connection is closed
    this.socket.onclose = () => {
      console.log("Disconnected from server");
    };
  }

  // === Keyboard inputs handler ===
  initInput() {
    // Listen for key press events
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        // Set resulting action to true for all pressed keys
        case "ArrowUp":
          this.inputState.up = true;
          break;
        case "ArrowDown":
          this.inputState.down = true;
          break;
        case "ArrowLeft":
          this.inputState.left = true;
          break;
        case "ArrowRight":
          this.inputState.right = true;
          break;
        case " ":
          this.inputState.attack = true;
          break;
      }
    });

    // Listen for key release events
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        // Set resulting action to false for all pressed keys
        case "ArrowUp":
          this.inputState.up = false;
          break;
        case "ArrowDown":
          this.inputState.down = false;
          break;
        case "ArrowLeft":
          this.inputState.left = false;
          break;
        case "ArrowRight":
          this.inputState.right = false;
          break;
        case " ":
          this.inputState.attack = false;
          break;
      }
    });
  }

  // === Send player inputs to the server regularly ===
  startInputSender() {
    // Send inputs to the server at the same rate as server ticks
    setInterval(() => {
      // Do nothing if the socket is not ready
      if (this.socket.readyState !== WebSocket.OPEN) return;

      // Send the current input state
      this.socket.send(
        JSON.stringify({
          type: "input",
          input: this.inputState,
        }),
      );
    }, this.SERVER_INTERVAL);
  }

  // === Main render loop ===
  loop(timestamp) {
    // Dessiner le jeu
    this.view.render();

    // Prochaine frame
    requestAnimationFrame(this.loop);
  }
}

// === Start the game controller ===
new GameController();
