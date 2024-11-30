/**
 * Represents an object that can move within the game world.
 * This class includes basic functionality such as movement, gravity, collision detection,
 * energy management, and jumping. It is extended by other objects that need movement and interaction.
 */
class MovableObject extends DrawableObject {

  /**
   * The horizontal speed of the object.
   * @type {number}
   */
  speed = 0.1;

  /**
   * A flag indicating whether the object is facing the opposite direction.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * The vertical speed of the object (used for gravity and jumping).
   * @type {number}
   */
  speedY = 0;

  /**
   * The acceleration due to gravity.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * The energy of the object (typically represents health or hit points).
   * @type {number}
   */
  energy = 100;

  /**
   * The energy associated with collecting coins.
   * @type {number}
   */
  coinEnergy = 0;

  /**
   * The energy associated with collecting bottles.
   * @type {number}
   */
  bottleEnergy = 0;

  /**
   * The timestamp of the last hit the object received.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Applies gravity to the object, adjusting its vertical position and speed.
   * @memberof MovableObject
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;        
      }    
    }, 1000 / 25); // Apply gravity in intervals of 1/25th of a second.
  }

  /**
   * Checks if the object is above the ground.
   * For throwable objects, this checks if it is falling (y < 350).
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) { // For throwable objects like bottles
      return this.y < 350; // Bottle is falling if its y position is less than 350
    } else {
      return this.y < 180; // Default value for other objects
    }
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {MovableObject} mo The object to check collision with.
   * @returns {boolean} True if there is a collision, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.offsetX + this.width - this.offsetWidth > mo.x + mo.offsetX &&
      this.y + this.offsetY + this.height - this.offsetHeight > mo.y + mo.offsetY &&
      this.x + this.offsetX < mo.x + mo.offsetX + mo.width - mo.offsetWidth &&
      this.y + this.offsetY < mo.y + mo.offsetY + mo.height - mo.offsetHeight
    );
  }

  /**
   * Checks if the object is "jumping on" an enemy (colliding from above).
   * @param {MovableObject} mo The enemy object to check against.
   * @returns {boolean} True if the object is jumping on the enemy, false otherwise.
   */
  jumpOnEnemy(mo) {
    let xTolerance = 0; // Horizontal tolerance for collision detection (in pixels)
    let yTolerance = 80; // Vertical tolerance for collision detection (in pixels)

    return (
      this.x + this.offsetX + this.width - this.offsetWidth - xTolerance > mo.x + mo.offsetX &&
      this.x + this.offsetX + xTolerance < mo.x + mo.offsetX + mo.width - mo.offsetWidth &&
      this.y + this.offsetY + this.height - this.offsetHeight - yTolerance > mo.y + mo.offsetY &&
      this.y + this.offsetY + yTolerance < mo.y + mo.offsetY + mo.height - mo.offsetHeight &&
      this.speedY < 0 // Ensures that the character is falling (i.e., jumping on the enemy)
    );
  }

  /**
   * Sets the collision offsets for the object to adjust the area checked for collisions.
   * @param {number} offsetX The horizontal offset for the collision area.
   * @param {number} offsetY The vertical offset for the collision area.
   * @param {number} offsetWidth The horizontal width offset for the collision area.
   * @param {number} offsetHeight The vertical height offset for the collision area.
   */
  setCollisionOffsets(offsetX, offsetY, offsetWidth, offsetHeight) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.offsetWidth = offsetWidth;
    this.offsetHeight = offsetHeight;
  }

  /**
   * Increases the coin energy of the object when a coin is collected.
   */
  catchCoin() {
    this.coinEnergy += 10;
    if (this.coinEnergy > 100) {
      this.coinEnergy = 100; // Cap the coin energy at 100
    }
  }

  /**
   * Increases the bottle energy of the object when a bottle is collected.
   */
  catchBottle() {
    this.bottleEnergy += 20;
    if (this.bottleEnergy > 100) {
      this.bottleEnergy = 100; // Cap the bottle energy at 100
    }
  }

  /**
   * Reduces the object's energy by 20 when it is hit.
   * @memberof MovableObject
   */
  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0; // Ensure energy does not drop below 0
    } else {
      this.lastHit = new Date().getTime();  // Store the timestamp of when the hit occurred
    }
  }

  /**
   * Checks if the object is still hurt (i.e., it was recently hit).
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Calculate the time since the last hit
    timePassed = timePassed / 1000; // Convert time from milliseconds to seconds
    return timePassed < 0.5; // Return true if less than 0.5 seconds have passed since the hit
  }

  /**
   * Checks if the object is dead (i.e., its energy is 0).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Plays an animation by cycling through the images.
   * @param {string[]} images The array of image paths to be used in the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path]; // Set the image from the cache based on the current image index.
    this.currentImage++;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }
}
