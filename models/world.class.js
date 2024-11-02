class World {

  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();


  constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollsions();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollsions(){
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)){
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);

        }
      });
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)){
          this.character.hit();
          this.coinBar.setPercentage(this.character.energy);
        }
      });
    }, 500);
  }

  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0); // (on)zeichnet alle elemente 100 pixel weiter links, sorgt dafür das die camera beim character bleibt  
    this.addObjectsToMap(this.level.backgroundObjects);   
    this.ctx.translate(-this.camera_x, 0); // (off)
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0); // (on)
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.enemies); 
    this.addObjectsToMap(this.level.clouds); 
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

}