class Player {
  constructor(
    name,
    attack,
    hp,
    speed,
    cooldown,
    coord,
    skin,
    no_hits,
    lvl,
    regen
  ) {
    this.name = name;
    this.attack = attack;
    this.hp = hp;
    this.speed = speed;
    this.cooldown = cooldown;
    this.coord = coord;
    this.skin = skin;
    this.no_hits = no_hits;
    this.lvl = lvl;
    this.regen = regen;
  }
}

name = null;
attack = 1;
hp = 1;
speed = 0;
cooldown = false;
coord = 0;
skin = 0;
no_hits = true;
lvl = 1;
regen = 0;
let on = 5;
let off = 0;

function AsAlive() {
  if (hp > 0) {
    if (no_hits == 0) {
      regen = on;
    } else {
      regen = off;
    }
    return 0;
  } else {
    //   skin = Animation(mort)
    return 1;
  }
}

function takeDamage() {}
