import Game from "./model/Game.js";
import GameView from "./view/GameView.js";
import GameController from "./controller/GameController.js";

// Model
const game = new Game();

// View
const gameView = new GameView(game);

// Controller (Launch game)
console.log(game, gameView);
const gameController = new GameController(game, gameView);
