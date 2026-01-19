// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
  isRunning: true,
  isOver: false,
  timer: 190.6000000000091,
  players: {
    "3cd71bbb-6a6b-4d4e-80e3-107130328a27": {
      name: "blabla",
      skinPath: "./spritesheets/3.png",
      position: [0, 0],
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

console.log("==========Instance de la Game 1==========");

const game1 = new Game();
game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========MetaData Test==========");
backendData.isOver = true;
backendData.timer = 192;
backendData.players["28ead291-fcea-4b41-a596-d3c876c49a53"].name =
  "MetaDataTEST";
backendData.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].hp = 2;
game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========AddPlayer Test==========");
const newPlayer = "new-player-666";

backendData.players[newPlayer] = {
  name: "Le Petit Nouveau",
  skinPath: "./assets/1.png",
  position: [0.5, 0.5],
  lvl: 1,
  hp: 100,
  maxHp: 100,
  hpRegenRate: 10,
  speed: 0.2,
  direction: 1,
  isAttacking: false,
  isWalking: true,
  isDying: false,
  attackCooldown: 1,
  currentAttackCooldown: 0,
};

game1.update(backendData);
console.log(structuredClone(game1));

console.log("==========DeletePlayer Test==========");

delete backendData.players[newPlayer];
game1.update(backendData);
console.log(structuredClone(game1));
