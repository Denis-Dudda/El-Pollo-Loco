class MovableObject extends DrawableObject{

 


  speed = 0.1;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  coinEnergy = 0;
  bottleEnergy = 0;
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
    if (this instanceof ThrowableObject) { // flasche fällt durch den boden
      return true;
    }else {
    return this.y < 180;
     }
  }


  isColliding (mo) {
    return  this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;

  }

  catchCoin(){
    this.coinEnergy += 20;
    if (this.coinEnergy > 100) {
      this.coinEnergy = 100;
    }
  }

  catchBottle(){
    this.bottleEnergy += 20;
    if (this.bottleEnergy > 100) {
      this.bottleEnergy = 100;
    }
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