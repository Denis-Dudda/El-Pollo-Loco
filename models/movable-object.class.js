class MovableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.1;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;


  applyGravity(){
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;        
      }

    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180;
  }

  loadImage(path){
    this.img = new Image(); // Image muss nicht neu definiert werden kommt vom js
    this.img.src = path; // der datei pfad den wir übergeben bekommen mit funktions aufruf
  }

  loadImages(arr) {
    arr.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;      
    });

  }

  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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

  isColliding (mo) {
    return  this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;

}

  hit(){
    this.energy -= 5;
    if (this.energy < 0) {
        this.energy = 0;
    }
  }

  isDead(){
    return this.energy == 0;
  }

  playAnimation(images){
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
  

  moveRight(){
    this.x += this.speed;
    

  }

  moveLeft() {
    this.x -= this.speed;
    

  }

}