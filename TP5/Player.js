class Player {
  constructor(name, [abscisse, ordonnee]) {
    this.name = name;
    this.coordonee = [abscisse, ordonnee];

    // WALK
    this.WalkSpiriteDuration = 2;
    this.WalkSpiriteIndex = 0;
    this.WalkSpiriteNumber = 9;
    this.currentWalkSpiritStep = 0;

    // ATTACK
    this.AttackSpiriteDuration = 2;
    this.AttackSpiriteIndex = 0;
    this.AttackSpiriteNumber = 6;
    this.currentAttackSpiritStep = 0;

    // IDLE
    this.idleSpiriteDuration = 5;
    this.idleSpiriteIndex = 0;
    this.idleSpiriteNumber = 4;
    this.currentidleSpiritStep = 0;

    // DIE
    this.dieSpiriteDuration = 3;
    this.dieSpiriteIndex = 0;
    this.dieSpiriteNumber = 6;
    this.currentdieSpiritStep = 0;

    // STATS
    this.level = 1;
    this.max_HP = 100;
    this.current_HP = 100;
    this.regen = 20;
    this.damageAttack = 30;
    this.cooldown = 5;
    this.currentCooldown = 0;
    this.moveSpeed = 10;

    // STATES
    this.isWalking = false;
    this.isAttacking = false;
    this.isDying = false;
  }

  update(serverPlayer) {
    this.name = serverPlayer.name;
    this.skin = serverPlayer.skin;
    this.position = serverPlayer.position;

    this.WalkSpiriteDuration = serverPlayer.WalkSpiriteDuration;
    this.WalkSpiriteIndex = serverPlayer.WalkSpiriteIndex;
    this.WalkSpiriteNumber = serverPlayer.WalkSpiriteNumber;
    this.currentWalkSpiritStep = serverPlayer.currentWalkSpiritStep;

    this.AttackSpiriteDuration = serverPlayer.AttackSpiriteDuration;
    this.AttackSpiriteIndex = serverPlayer.AttackSpiriteIndex;
    this.AttackSpiriteNumber = serverPlayer.AttackSpiriteNumber;
    this.currentAttackSpiritStep = serverPlayer.currentAttackSpiritStep;

    this.idleSpiriteDuration = serverPlayer.idleSpiriteDuration;
    this.idleSpiriteIndex = serverPlayer.idleSpiriteIndex;
    this.idleSpiriteNumber = serverPlayer.idleSpiriteNumber;
    this.currentidleSpiritStep = serverPlayer.currentidleSpiritStep;

    this.dieSpiriteDuration = serverPlayer.dieSpiriteDuration;
    this.dieSpiriteIndex = serverPlayer.dieSpiriteIndex;
    this.dieSpiriteNumber = serverPlayer.dieSpiriteNumber;
    this.currentdieSpiritStep = serverPlayer.currentdieSpiritStep;

    this.level = serverPlayer.level;
    this.max_HP = serverPlayer.maxHP;
    this.current_HP = serverPlayer.currentHP;
    this.regen = serverPlayer.regenHP;
    this.damageAttack = serverPlayer.damageAttack;
    this.cooldown = serverPlayer.cooldown;
    this.currentCooldown = serverPlayer.currentCooldown;
    this.moveSpeed = serverPlayer.moveSpeed;

    this.isWalking = serverPlayer.isWalking;
    this.isAttacking = serverPlayer.isAttacking;
    this.isDying = serverPlayer.isDying;
  }

  animate() {
    if (this.isWalking) {
      this.currentWalkSpiritStep++;
      if (this.currentWalkSpiritStep >= this.WalkSpiriteDuration) {
        this.currentWalkSpiritStep = 0;
        this.WalkSpiriteIndex++;
      }
      if (this.WalkSpiriteIndex >= this.WalkSpiriteNumber) {
        this.WalkSpiriteIndex = 0;
      }
    } else if (this.isAttacking) {
      this.currentAttackSpiritStep++;
      if (this.currentAttackSpiritStep >= this.AttackSpiriteDuration) {
        this.currentAttackSpiritStep = 0;
        this.AttackSpiriteIndex++;
      }
      if (this.AttackSpiriteIndex >= this.AttackSpiriteNumber) {
        this.AttackSpiriteIndex = 0;
      }
    } else if (this.isDying) {
      this.currentdieSpiritStep++;
      if (this.currentdieSpiritStep >= this.dieSpiriteDuration) {
        this.currentdieSpiritStep = 0;
        this.dieSpiriteIndex++;
      }
      if (this.dieSpiriteIndex >= this.dieSpiriteNumber) {
        this.dieSpiriteIndex = 0;
      }
    } else {
      this.currentidleSpiritStep++;
      if (this.currentidleSpiritStep >= this.idleSpiriteDuration) {
        this.currentidleSpiritStep = 0;
        this.idleSpiriteIndex++;
      }
      if (this.idleSpiriteIndex >= this.idleSpiriteNumber) {
        this.idleSpiriteIndex = 0;
      }
    }
  }
}

const player1 = new Player("toto", [0, 0]);
player1.isWalking = true;

for (let i = 0; i < 13; i++) {
  player1.animate();

  console.log("Frame", i);
  console.log("isWalking =", player1.isWalking);
  console.log(
    "WalkSpriteIndex =",
    player1.WalkSpiriteIndex,
    "/",
    player1.WalkSpiriteNumber
  );
  console.log(
    "currentWalkSpiritStep =",
    player1.currentWalkSpiritStep,
    "/",
    player1.WalkSpiriteDuration
  );
  console.log("----");
}
