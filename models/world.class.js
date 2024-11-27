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
  winImage = new Image(); // win img
  showWinImage = false; // win img
  loseImage = new Image(); // lose img
  showLoseImage = false; // lose img
  hurtCoolDown = false;
  coinCollect_sound = new Audio('audio/coin-sound.mp3');
  bottleCollect_sound = new Audio('audio/bottle-sound.mp3');
  brokeBotlle_sound = new Audio('audio/broke-glas.mp3');
  gameMusic_sound = new Audio('audio/game-music.mp3');
  jump_sound = new Audio('audio/jump-sound.mp3');
  allSounds = [];
  knockBack = false;


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

  setWorld() {
    this.character.world = this;
    this.endBoss.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 200);
    setInterval(() => {
      this.checkCoinCollision();
    }, 100);
    setInterval(() => {
      this.checkBottleCollision();
    }, 100);
    setInterval(() => {
      this.checkThrwoObjects();
    }, 100);
    setInterval(() => {
      this.checkJumpOn();
    }, 10);
    setInterval(() => {
      this.checkKnockBack();
    }, 10);
    setInterval(() => {
      this.characterCollision();
    }, 800);
    setInterval(() => {
      this.playSound(this.gameMusic_sound);
    }, 200)
  }

  pushSounds(){
    this.allSounds.push(this.coinCollect_sound);
    this.allSounds.push(this.bottleCollect_sound);
    this.allSounds.push(this.brokeBotlle_sound);
    this.allSounds.push(this.gameMusic_sound);
    this.allSounds.push(this.jump_sound);
  }

  characterCollision() {
    this.level.enemies.forEach((enemy) => {
      if ((this.character.isColliding(enemy) && !this.character.isAboveGround() && !this.hurtCoolDown) || (this.character.isColliding(enemy) && enemy.type == "endboss")) 
        { this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          this.hurtCoolDown = true;
          setTimeout(() => {
          this.hurtCoolDown = false;
        }, 1000);
      }
    });
  }

  checkKnockBack(){
    this.level.enemies.forEach((enemy) => {
      if ((this.character.isColliding(enemy) && enemy.type == "endboss")) { 
          this.knockBack = true;
            if (this.knockBack) {
              this.character.x -= 5;
              this.knockBack = false;
            }
      }
    });
    
  }

  checkThrwoObjects() {
    if (this.keyboard.D && this.bottleCount > 0 && this.bottleCoolDown) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.bottleCount--; // minus für jeden wurf
      this.removeBottle();
      this.character.bottleEnergy = this.character.bottleEnergy - 20;
      this.bottleBar.setPercentage(this.character.bottleEnergy);
      this.bottleCoolDown = false;
      setTimeout(() => {
        this.bottleCoolDown = true;
      }, 1500);
    }
  }

  removeBottle() {
    setTimeout(() => {
      this.throwableObjects.splice(0, 1); // entfernt die flaschen nach dem aufprall auf dem boden
      if (allSoundsMute) {
        this.playSound(this.brokeBotlle_sound);  
      }
    }, 1300);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {            // wurf kollision
      this.throwableObjects.forEach((bottle, j) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();
          if (enemy.type == "endboss") {
            this.endBoss.HP = this.endBoss.HP - 20;
            enemy.healthbar.setPercentage(this.endBoss.HP);}
          if (enemy.type == "endboss" && enemy.energy == 0) {
            setTimeout(() => {
              this.showWinImage = true; // win img
              this.clearAllIntervals(); // spiel beenden
              this.gameMusic_sound.pause();
            }, 1300);}
          if (enemy.type == "chicken" || enemy.type == "small-chicken") {
            setTimeout(() => {
              this.level.enemies.splice(index, 1);
            }, 200);}
          this.throwableObjects.splice(j, 1);
          if (allSoundsMute) {
            this.playSound(this.brokeBotlle_sound);}
        }
      });
    });
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.catchCoin();
        this.coinBar.setPercentage(this.character.coinEnergy);
        if (allSoundsMute) {
          this.playSound(this.coinCollect_sound);}
        const index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
      }
    });
  }

  checkBottleCollision() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.catchBottle();
        this.bottleCount++;
        this.bottleBar.setPercentage(this.character.bottleEnergy);
        if (allSoundsMute) {
          this.playSound(this.bottleCollect_sound);}
        const index = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(index, 1);
      }
    });
  }

  checkJumpOn() {
    if (this.character.isAboveGround()) {
      this.level.enemies.forEach((enemy, i) => {
        if (this.character.jumpOnEnemy(enemy)) {
          if (enemy.type == "chicken" || enemy.type == "small-chicken") {
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

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0); // (on)zeichnet alle elemente 100 pixel weiter links, sorgt dafür das die camera beim character bleibt
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0); // (off)
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0); // (on)
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0); // verschiebt das bild dann wieder zurück so das die camera am character bleibt
    if (this.showWinImage) {
      this.ctx.drawImage(
        this.winImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      ); // win img
    }
    if (this.character.showLoseImage) {
      this.ctx.drawImage(
        this.loseImage,0,0,
        this.canvas.width,
        this.canvas.height
      ); // lose img
    }
    // draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
  // führt addToMap immer wieder aus benutzen für arrays
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
  // zeichnet mir ein bild
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);        // draw Frame

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  playSound(sound) {
    if (!sound.playing) {
      sound.play();
      sound.playing = true; // Markiere als "spielend"
      sound.onended = () => {
      sound.playing = false; // Zurücksetzen, wenn der Sound fertig ist
      };
    }
  }
}
