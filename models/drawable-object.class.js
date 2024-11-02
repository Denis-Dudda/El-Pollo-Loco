class DrawableObject {

  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;


  loadImage(path){
    this.img = new Image(); // Image muss nicht neu definiert werden kommt vom js
    this.img.src = path; // der datei pfad den wir übergeben bekommen mit funktions aufruf
  }

  draw(ctx){
  //  try {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  //  } catch (e){
  //    console.log('error loading image',e);
  //    console.log('coud not load img', this.img);
  //  }
  }

  loadImages(arr) {
    arr.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;      
    });

  }

  drawFrame(ctx){
    if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof EndBoss) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();      
    }

  }






}