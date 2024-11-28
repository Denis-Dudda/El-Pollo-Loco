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
    if (this instanceof ThrowableObject) { // flasche fällt auf den boden
      return this.y < 350;
    }else {
    return this.y < 180;
     }
  }


  isColliding (mo) {
    return (
      this.x + this.offsetX + this.width - this.offsetWidth > mo.x + mo.offsetX &&
      this.y + this.offsetY + this.height - this.offsetHeight > mo.y + mo.offsetY &&
      this.x + this.offsetX < mo.x + mo.offsetX + mo.width - mo.offsetWidth &&
      this.y + this.offsetY < mo.y + mo.offsetY + mo.height - mo.offsetHeight
  );
  }

  jumpOnEnemy(mo) {
    let xTolerance = 0; // Toleranz in Pixeln für die horizontale Kollision
    let yTolerance = 80; // Toleranz in Pixeln für die vertikale Kollision

    return (
        this.x + this.offsetX + this.width - this.offsetWidth - xTolerance > mo.x + mo.offsetX &&
        this.x + this.offsetX + xTolerance < mo.x + mo.offsetX + mo.width - mo.offsetWidth &&
        this.y + this.offsetY + this.height - this.offsetHeight - yTolerance > mo.y + mo.offsetY &&
        this.y + this.offsetY + yTolerance < mo.y + mo.offsetY + mo.height - mo.offsetHeight &&
        this.speedY < 0 // Stellt sicher, dass der Charakter nach unten fällt
    );
}

  setCollisionOffsets(offsetX, offsetY, offsetWidth, offsetHeight) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.offsetWidth = offsetWidth;
    this.offsetHeight = offsetHeight;
}

  catchCoin(){
    this.coinEnergy += 10;
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
    this.energy -= 20;
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