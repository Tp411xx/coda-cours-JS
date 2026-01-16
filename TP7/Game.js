// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
  isRunning: true,
  isOver: false,
  timer: 190.6000000000091,
  players: {
    "3cd71bbb-6a6b-4d4e-80e3-107130328a27": {
      name: "blabla",
      skinPath: "./spritesheets/3.png",
      position: [0.5600000000000003, 0.17999999999999977],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 3,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
    "28ead291-fcea-4b41-a596-d3c876c49a53": {
      name: "bloublou",
      skinPath: "./spritesheets/4.png",
      position: [0.44, 0.19],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 0,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
  },
};

class Game {
  constructor(backendData) {
    this.isRunning = backendData.isRunning;
    this.isOver = backendData.isOver;
    this.timer = backendData.timer;

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
          playerData.position
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
