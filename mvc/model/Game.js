import Player from "./Player.js";

export default class Game {
  constructor() {
    this.isRunning = false;
    this.isOver = false;
    this.timer = 0;

    this.players = {};
  }

  update(gameStateFromServer) {
    // Update des métadonnées

    this.isRunning = gameStateFromServer.isRunning;
    this.isOver = gameStateFromServer.isOver;
    this.timer = gameStateFromServer.timer;

    const serverPlayers = gameStateFromServer.players;

    // Ajout / mise à jour des joueurs

    for (const playerId in serverPlayers) {
      const playerData = serverPlayers[playerId];

      // Nouveau joueur
      if (!this.players[playerId]) {
        this.players[playerId] = new Player(
          playerId,
          playerData.name,
          playerData.skinPath,
          playerData.position,
        );
      }
      // Joueur existant → update
      this.players[playerId].update(playerData);
    }

    // Suppression des joueurs absents

    for (const playerId in this.players) {
      if (!serverPlayers[playerId]) {
        delete this.players[playerId];
      }
    }
  }
}
