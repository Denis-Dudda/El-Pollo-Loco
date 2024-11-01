class MovableObject extends DrawableObject{

 


  speed = 0.1;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;


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
    } else {
      this.lastHit = new Date().getTime();  // zeit vom treffer
    }
  }

  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit; //difference in ms
    timepassed = timepassed / 1000; //difference in s
    return timepassed < 0.5; // wie lange die animation gezeigt wird
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