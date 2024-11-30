/**
 * Represents a drawable object on the canvas, including properties for dimensions, position, and image handling.
 */
class DrawableObject {

  /**
   * Horizontal offset for collision detection.
   * @type {number}
   */
  offsetX = 0;

  /**
   * Vertical offset for collision detection.
   * @type {number}
   */
  offsetY = 0;

  /**
   * Width offset for collision detection.
   * @type {number}
   */
  offsetWidth = 0;

  /**
   * Height offset for collision detection.
   * @type {number}
   */
  offsetHeight = 0;

  /**
   * The current image object for the drawable.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * A cache of preloaded images, stored as key-value pairs.
   * The key is the image path, and the value is the `HTMLImageElement`.
   * @type {Object<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * The index of the current image in an animation sequence.
   * @type {number}
   */
  currentImage = 0;

  /**
   * The horizontal position of the object.
   * @type {number}
   */
  x = 120;

  /**
   * The vertical position of the object.
   * @type {number}
   */
  y = 280;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 100;

  /**
   * Loads a single image and sets it as the object's current image.
   * 
   * @param {string} path - The file path of the image to load.
   */
  loadImage(path) {
    this.img = new Image(); // Create a new image object
    this.img.src = path;   // Set the source to the provided path
  }

  /**
   * Draws the object on the provided canvas context.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Preloads multiple images and stores them in the `imageCache`.
   * 
   * @param {string[]} arr - An array of file paths for images to load.
   */
  loadImages(arr) {
    arr.forEach(path => {
      let img = new Image();       // Create a new image object
      img.src = path;              // Set the source to the provided path
      this.imageCache[path] = img; // Store the image in the cache
    });
  }
}
