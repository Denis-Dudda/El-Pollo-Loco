class World {
  character = new Character();
  endBoss = new EndBoss(this);
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  throwableObjects = [];
  bottleCount = 0;
  bottleCoolDown = true;
  winImage = new Image(); // Win screen image
  showWinImage = false; // Display win screen
  loseImage = new Image(); // Lose screen image
  showLoseImage = false; // Display lose screen
  hurtCoolDown = false;
  coinCollect_sound = new Audio('audio/coin-sound.mp3');
  bottleCollect_sound = new Audio('audio/bottle-sound.mp3');
  brokeBotlle_sound = new Audio('audio/broke-glas.mp3');
  gameMusic_sound = new Audio('audio/game-music.mp3');
  jump_sound = new Audio('audio/jump-sound.mp3');
  allSounds = [];
  knockBack = false;

  /**
   * Initializes the World object.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   * @param {Object} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.winImage.src = "img/9_intro_outro_screens/win/win_2.png";
    this.loseImage.src = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.pushSounds();
  }

  /**
   * Assigns the world object to its components.
   */
  setWorld() {
    this.character.world = this;
    this.endBoss.world = this;
  }

  /**
   * Sets up the game logic and intervals for collision detection, movement, and sound playback.
   */
  run() {
    setInterval(() => this.checkCollisions(), 200);
    setInterval(() => this.checkCoinCollision(), 100);
    setInterval(() => this.checkBottleCollision(), 100);
    setInterval(() => this.checkThrowObjects(), 100);
    setInterval(() => this.checkJumpOn(), 10);
    setInterval(() => this.checkKnockBack(), 1);
    setInterval(() => this.characterCollision(), 800);
    setInterval(() => this.playSound(this.gameMusic_sound), 200);
  }

  /**
   * Adds all game sounds to the sound array.
   */
  pushSounds() {
    this.allSounds.push(this.coinCollect_sound);
    this.allSounds.push(this.bottleCollect_sound);
    this.allSounds.push(this.brokeBotlle_sound);
    this.allSounds.push(this.gameMusic_sound);
    this.allSounds.push(this.jump_sound);
  }

  /**
   * Handles character collision logic with enemies.
   */
  characterCollision() {
    this.level.enemies.forEach((enemy) => {
      if (
        (this.character.isColliding(enemy) && !this.character.isAboveGround() && !this.hurtCoolDown) ||
        (this.character.isColliding(enemy) && enemy.type === "endboss")
      ) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        this.hurtCoolDown = true;
        setTimeout(() => {
          this.hurtCoolDown = false;
        }, 600);
      }
    });
  }

  /**
   * Checks and applies knockback when the character collides with the end boss.
   */
  checkKnockBack() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && enemy.type === "endboss") {
        this.knockBack = true;
        this.character.x -= 4;
      }
    });
  }

  /**
   * Checks if the character throws an object and handles the logic for cooldowns and bottle count.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleCount > 0 && this.bottleCoolDown) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.bottleCount--;
      this.removeBottle();
      this.character.bottleEnergy -= 20;
      this.bottleBar.setPercentage(this.character.bottleEnergy);
      this.bottleCoolDown = false;
      setTimeout(() => {
        this.bottleCoolDown = true;
      }, 1500);
    }
  }

  /**
   * Removes a thrown bottle after it lands.
   */
  removeBottle() {
    setTimeout(() => {
      this.throwableObjects.splice(0, 1);
      if (allSoundsMute) {
        this.playSound(this.brokeBotlle_sound);
      }
    }, 1300);
  }

  /**
   * Checks for collisions between throwable objects and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      this.throwableObjects.forEach((bottle, j) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();
          this.collisionHelperEndboss(enemy);
          this.collisionHelperChicken(enemy, index, j);
        }
      });
    });
  }

  /**
   * Handles logic when a bottle collides with the end boss.
   * @param {Object} enemy - The enemy object representing the end boss.
   */
  collisionHelperEndboss(enemy) {
    if (enemy.type === "endboss") {
      this.endBoss.HP -= 20;
      enemy.healthbar.setPercentage(this.endBoss.HP);
    }
    if (enemy.type === "endboss" && enemy.energy === 0) {
      setTimeout(() => {
        this.showWinImage = true;
        this.clearAllIntervals();
        document.getElementById('btn-restart').classList.remove('d-none');
        this.gameMusic_sound.pause();
      }, 1300);
    }
  }

  /**
   * Handles logic when a bottle collides with a chicken enemy.
   * @param {Object} enemy - The enemy object representing the chicken.
   * @param {number} index - The index of the enemy in the enemies array.
   * @param {number} j - The index of the bottle in the throwableObjects array.
   */
  collisionHelperChicken(enemy, index, j) {
    if (enemy.type === "chicken" || enemy.type === "small-chicken") {
      setTimeout(() => {
        this.level.enemies.splice(index, 1);
      }, 200);
    }
    this.throwableObjects.splice(j, 1);
    if (allSoundsMute) {
      this.playSound(this.brokeBotlle_sound);
    }
  }

  /**
   * Checks for collisions between the character and collectible coins.
   */
  checkCoinCollision() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.catchCoin();
        this.coinBar.setPercentage(this.character.coinEnergy);
        if (allSoundsMute) {
          this.playSound(this.coinCollect_sound);
        }
        const index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
      }
    });
  }

  /**
   * Checks for collisions between the character and collectible bottles.
   */
  checkBottleCollision() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.catchBottle();
        this.bottleCount++;
        this.bottleBar.setPercentage(this.character.bottleEnergy);
        if (allSoundsMute) {
          this.playSound(this.bottleCollect_sound);
        }
        const index = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(index, 1);
      }
    });
  }

  /**
   * Checks if the character jumps on an enemy and applies corresponding logic.
   */
  checkJumpOn() {
    if (this.character.isAboveGround()) {
      this.level.enemies.forEach((enemy, i) => {
        if (this.character.jumpOnEnemy(enemy)) {
          if (enemy.type === "chicken" || enemy.type === "small-chicken") {
            enemy.hit();
            setTimeout(() => {
              this.level.enemies.splice(i, 1);
            }, 300);
            this.character.jump();
            if (allSoundsMute) {
              this.playSound(this.jump_sound);
            }
          }
        }
      });
    }
  }

  /**
   * Draws all game elements and updates the canvas in a loop.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0); // Shifts all objects left for camera movement
    this.drawAddObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.drawBars();
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.ctx.translate(-this.camera_x, 0);
    this.drawWinOrLose();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws additional objects like backgrounds, clouds, coins, bottles, enemies, and throwable objects.
   */
  drawAddObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Draws status bars such as health, coins, and bottles.
   */
  drawBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
  }

  /**
   * Draws either the win or lose screen based on the game state.
   */
  drawWinOrLose() {
    if (this.showWinImage) {
      this.ctx.drawImage(this.winImage, 0, 0, this.canvas.width, this.canvas.height);
    }
    if (this.character.showLoseImage) {
      this.ctx.drawImage(this.loseImage, 0, 0, this.canvas.width, this.canvas.height);
    }
  }

  /**
   * Adds a list of objects to the map.
   * @param {Object[]} objects - An array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Adds an individual object to the map.
   * @param {Object} mo - The movable object to be added.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image horizontally for left-facing sprites.
   * @param {Object} mo - The movable object to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

  /**
   * Restores the flipped image back to its original state.
   * @param {Object} mo - The movable object to be restored.
   */
  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }

  /**
   * Clears all active intervals, effectively stopping the game.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * Plays a sound if it's not already playing.
   * @param {HTMLAudioElement} sound - The sound to be played.
   */
  playSound(sound) {
    if (!sound.playing) {
      sound.play();
      sound.playing = true;
      sound.onended = () => {
        sound.playing = false;
      };
    }
  }
}
