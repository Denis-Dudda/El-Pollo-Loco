class World {

  character = new Character();
  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
  ];
  clouds = [
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ];
  backgroundObjects = [
    new BackgroundObject('img/5_background/layers/air.png', -719,),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719,),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719,),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719,),
    new BackgroundObject('img/5_background/layers/air.png', 0,),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0,),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,),
    new BackgroundObject('img/5_background/layers/air.png', 719,),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719,),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719,),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719,),
    new BackgroundObject('img/5_background/layers/air.png', 1438,),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438,),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438,),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438,),
    new BackgroundObject('img/5_background/layers/air.png', 2157,),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2157,),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2157,),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2157,),
    new BackgroundObject('img/5_background/layers/air.png', 2876,),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2876,),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2876,),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2876,),
  ]
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
    this.addObjectsToMap(this.backgroundObjects)   
    this.addToMap(this.character);
    
    this.addObjectsToMap(this.enemies); 
    this.addObjectsToMap(this.clouds); 
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