class DrawableObject {

  offsetX = 0;
  offsetY = 0;
  offsetWidth = 0;
  offsetHeight = 0;
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
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(arr) {
    arr.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;      
    });
  }
}