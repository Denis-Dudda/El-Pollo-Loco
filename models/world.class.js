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
  

  constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
    this.endBoss.world = this;
  }

  run(){
    setInterval(() => {
      this.checkCollisions();
      this.checkCoinCollision();
      this.checkBottleCollision();
      this.checkThrwoObjects();
      this.checkJumpOn();         // intervalle muss noch angepasst werden und funktionen trennen mit mehr intervallen !!!!!!!!!!!!!!!!!!!!!!!!!
    }, 100);
    setInterval(() => {
      this.characterCollision();
    }, 800);                          // intervalle muss noch angepasst werden und funktionen trennen mit mehr intervallen !!!!!!!!!!!!!!!!!!!!!!!!!
  }

    characterCollision(){
        this.level.enemies.forEach((enemy) => {
          if (this.character.isColliding(enemy) && !this.character.isAboveGround() || this.character.isColliding(enemy) && enemy.type == 'endboss'){
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
          }
        });
    }

  checkThrwoObjects(){
    if (this.keyboard.D && this.bottleCount > 0 && this.bottleCoolDown) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.bottleCount--;// minus für jeden wurf
      this.removeBottle();
      this.character.bottleEnergy = this.character.bottleEnergy - 20;
      this.bottleBar.setPercentage(this.character.bottleEnergy);
      this.bottleCoolDown = false;
      setTimeout(() => {
        this.bottleCoolDown = true;
      }, 1500);  
    }
  }

  removeBottle(){
    setTimeout(() => {
      this.throwableObjects.splice(0 , 1) // entfernt die flaschen nach dem aufprall auf dem boden
    }, 1300);
  }

  checkCollisions(){
    this.level.enemies.forEach((enemy, index) => {    // wurf kollision
      this.throwableObjects.forEach((bottle, j) => {
        if (bottle.isColliding(enemy)) {
          enemy.hit();
          if (enemy.type == 'endboss' && enemy.energy == 0) {
            setTimeout(() => {
             // this.clearAllIntervals();                        // spiel beenden
            }, 1000);
             
            
          }
          if (enemy.type == 'chicken' || enemy.type == 'small-chicken') {
            setTimeout(() => {
              this.level.enemies.splice(index , 1);   
            }, 200); 
          }    
        this.throwableObjects.splice(j , 1)        
        }
      });
    });
  }

  checkCoinCollision(){
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)){
        this.character.catchCoin();
        this.coinBar.setPercentage(this.character.coinEnergy);
        const index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index , 1);
      }
    });
  }

  checkBottleCollision(){
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)){
        this.character.catchBottle();
        this.bottleCount++;
        this.bottleBar.setPercentage(this.character.bottleEnergy);
        const index = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(index , 1)
      }
    }); 
  }

  checkJumpOn(){
    if (this.character.isAboveGround()) {
      this.level.enemies.forEach((enemy, i) => {
        if (this.character.jumpOnEnemy(enemy)){
          if (enemy.type == 'chicken' || enemy.type == 'small-chicken') {
            enemy.hit();
            setTimeout(() => {
              this.level.enemies.splice(i , 1);
            }, 300);
            this.character.jump(); 
          }

              
                
        }
      });      
    }
  }

  draw(){
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

    // draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function(){
      self.draw();
    });
  }
  // führt addToMap immer wieder aus benutzen für arrays
  addObjectsToMap(objects){
    objects.forEach(o => {
      this.addToMap(o);
    });
  }
  // zeichnet mir ein bild
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

  

    if (mo.otherDirection){
      this.flipImageBack(mo);
    }
  }

  flipImage(mo){
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1
  }

  flipImageBack(mo){
    mo.x = mo.x * -1
    this.ctx.restore();
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

}