/**
 * Represents a bottle object that moves and animates on the ground.
 * Extends the `MovableObject` class for movement and animation handling.
 */
class Bottle extends MovableObject {

  /**
   * The width of the bottle.
   * @type {number}
   */
  width = 80;

  /**
   * The height of the bottle.
   * @type {number}
   */
  height = 80;

  /**
   * An array of image paths representing the bottle's animation when it is on the ground.
   * @type {string[]}
   */
  BOTTLE_MOVING = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  /**
   * Creates a new `Bottle` instance.
   * Initializes the bottle's position, collision offsets, and starts its animation.
   * @param {number} x The initial horizontal position of the bottle.
   * @param {number} y The initial vertical position of the bottle.
   */
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); // Load the first image for the bottle
    this.loadImages(this.BOTTLE_MOVING); // Load all bottle images into the image cache
    this.setCollisionOffsets(20, 95, 15, 10); // Set collision offsets for accurate collision detection
    this.x = x; // Set the initial x position of the bottle
    this.y = y; // Set the initial y position of the bottle
    this.animate(); // Start the bottle's animation
  }

  /**
   * Animates the bottle by alternating between images in the `BOTTLE_MOVING` array.
   * The animation updates every 400 milliseconds.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.BOTTLE_MOVING); // Play the bottle's animation
    }, 400); // Update the animation every 400 milliseconds
  }
}
