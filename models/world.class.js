class World {

  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;


  constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }


  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0); // zeichnet alle elemente 100 pixel weiter links, sorgt dafür das die camera beim character bleibt  
    this.addObjectsToMap(this.level.backgroundObjects)   
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
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection){
      mo.x = mo.x * -1
      this.ctx.restore();
    }
  }

}