const directions = {
  north: 0,
  east: 1,
  south: 2,
  west: 3,
};

export default class Player {
  constructor(id, name, skinPath, position) {
    // Unique identifier attributed by the server
    this.id = id;
    // Name of the player (chosen at portal)
    this.name = name;
    // Path to the spritesheet used to represent the player (idem)
    this.skinPath = skinPath;

    // --- RENDER positions ---
    this.renderX = position[0];
    this.renderY = position[1];

    // --- Stats ---
    this.lvl = 1;
    this.hp = 100;
    this.maxHp = 100;
    this.speed = 0.2;

    // --- Direction & states ---
    this.direction = directions.south;
    this.isWalking = false;
    this.isAttacking = false;
    this.isDying = false;
    this.isDead = false;

    this.walkRowIndex = 10; // Ligne par défaut (ex: Sud)
    this.attackRowIndex = 0; // Ligne d'attaque

    // --- Animations (remains non affected by server updates, only concernes frontend logic) ---
    this.walkSpriteIndex = 0;
    this.walkSpritesNumber = 9;
    this.currentWalkSpriteStep = 0;
    this.walkSpriteDuration = 7;

    this.attackSpriteIndex = 0;
    this.attackSpritesNumber = 6;
    this.currentAttackSpriteStep = 0;
    this.attackSpriteDuration = 9;

    this.deathSpriteIndex = 0;
    this.deathSpritesNumber = 6;
    this.currentDeathSpriteStep = 0;
    this.deathSpriteDuration = 5;

    this.image = new Image();
    this.image.src = skinPath; // Utilise le skinPath reçu du serveur
    this.imageLoaded = false;
    this.image.onload = () => {
      this.imageLoaded = true;

      this.prevX = position[0];
      this.prevY = position[1];
      this.targetX = position[0];
      this.targetY = position[1];
      this.renderX = position[0];
      this.renderY = position[1];
    };
  }

  update(updateData) {
    // maj cible, l'ancienne -> position précédente
    this.prevX = this.targetX;
    this.prevY = this.targetY;

    // Nouvelle position reçue du serveur
    this.targetX = updateData.position[0];
    this.targetY = updateData.position[1];

    // Mise à jour des stats pour le HUD
    this.hp = updateData.hp;
    this.maxHp = updateData.maxHp;
    this.lvl = updateData.lvl;

    if (this.skinPath !== updateData.skinPath) {
      console.log(
        `Changement de skin pour ${this.name}: ${updateData.skinPath}`,
      );
      this.skinPath = updateData.skinPath;
      this.image.src = this.skinPath;
      this.imageLoaded = false;
    }

    // 2. On met à jour le reste (tu peux enlever la ligne redondante this.skinPath = updateData.skinPath plus bas)
    this.isAttacking = updateData.isAttacking;
    this.isWalking = updateData.isWalking;
    this.isDying = updateData.isDying;
    // Update authoritative position
    [this.renderX, this.renderY] = updateData.position;

    this.direction = updateData.direction;
    // Update stats
    this.name = updateData.name;
    this.lvl = updateData.lvl;
    this.hp = updateData.hp;
    this.maxHp = updateData.maxHp;
    this.attackCooldown = updateData.attackCooldown;
    this.currentAttackCooldown = updateData.currentAttackCooldown;
    this.speed = updateData.speed;

    this.direction = updateData.direction;
    this.isAttacking = updateData.isAttacking;
    this.isWalking = updateData.isWalking;
    this.isDying = updateData.isDying;
    this.skinPath = updateData.skinPath;
  }

  animate() {
    // 1. PRIORITÉ : Attaque
    if (
      this.isAttacking ||
      this.currentAttackSpriteStep > 0 ||
      this.attackSpriteIndex > 0
    ) {
      // Reset de la marche car on attaque
      this.currentWalkSpriteStep = 0;
      this.walkSpriteIndex = 0;

      this.currentAttackSpriteStep++;
      if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
        this.currentAttackSpriteStep = 0;
        this.attackSpriteIndex++;
      }

      if (this.attackSpriteIndex >= this.attackSpritesNumber) {
        this.attackSpriteIndex = 0;
      }
    }
    // 2. Marche (Seulement si on ne joue pas déjà l'animation d'attaque)
    else if (this.isWalking) {
      this.currentWalkSpriteStep++;
      if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
        this.currentWalkSpriteStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpritesNumber) {
        this.walkSpriteIndex = 0;
      }
    }
    // 3. Mort
    else if (
      this.isDying ||
      this.currentDeathSpriteStep > 0 ||
      this.deathSpriteIndex > 0
    ) {
      this.currentDeathSpriteStep++;
      if (this.currentDeathSpriteStep >= this.deathSpriteDuration) {
        this.currentDeathSpriteStep = 0;
        this.deathSpriteIndex++;
      }
      if (this.deathSpriteIndex >= this.deathSpritesNumber) {
        this.isDead = true;
      }
    }
    // 4. Idle
    else {
      this.walkSpriteIndex = 0;
    }
  }
  interpolate(alpha) {
    // Formule d'interpolation linéaire (LERP)
    this.renderX = this.prevX + (this.targetX - this.prevX) * alpha;
    this.renderY = this.prevY + (this.targetY - this.prevY) * alpha;
  }
}
