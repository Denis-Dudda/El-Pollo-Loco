/**
 * Represents a coin that can be collected in the game.
 * Extends the `MovableObject` class to enable animations and movement.
 */
class Coin extends MovableObject {

  /**
   * An array of image paths representing the coin animation frames.
   * @type {string[]}
   */
  COIN_MOVING = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png',
  ];

  /**
   * Creates a new `Coin` instance with a given position.
   * Initializes the coin's position, collision offsets, and animation.
   * 
   * @param {number} x - The horizontal position of the coin.
   * @param {number} y - The vertical position of the coin.
   */
  constructor(x, y) {
    super().loadImage('img/8_coin/coin_1.png'); // Load the initial image for the coin
    this.loadImages(this.COIN_MOVING);           // Preload the animation images
    this.setCollisionOffsets(25, 45, 25, 65);    // Set collision offsets for accurate detection
    this.x = x;                                 // Set the coin's x position
    this.y = y;                                 // Set the coin's y position
    this.animate();                             // Start the coin animation
  }

  /**
   * Animates the coin by alternating between the images in the `COIN_MOVING` array.
   * The animation is updated every 400 milliseconds.
   */
  animate() { 
    setInterval(() => {
      this.playAnimation(this.COIN_MOVING); // Play the coin animation frames
    }, 400); // Change the frame every 400 ms
  }
}
