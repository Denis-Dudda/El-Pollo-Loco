/**
 * Represents an object in the background of the game that moves with the player.
 * It is a subclass of `MovableObject` and handles loading and positioning of background elements.
 */
class BackgroundObject extends MovableObject {

  /**
   * The width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new `BackgroundObject` instance with the given image and horizontal position.
   * The object is positioned at the bottom of the screen by default.
   * 
   * @param {string} imagePath The path to the image for the background object.
   * @param {number} x The horizontal position of the object on the screen.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);  // Load the background image using the provided path
    this.x = x;                    // Set the horizontal position of the background object
    this.y = 480 - this.height;    // Set the vertical position to be at the bottom of the screen
  }
}
