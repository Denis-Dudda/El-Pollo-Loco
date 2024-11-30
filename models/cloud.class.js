/**
 * Represents a cloud object that moves across the screen.
 * Extends the `MovableObject` class to enable movement and animation.
 */
class Cloud extends MovableObject {

  /**
   * The initial vertical position of the cloud.
   * @type {number}
   */
  y = 50;

  /**
   * The height of the cloud.
   * @type {number}
   */
  height = 100;

  /**
   * The width of the cloud.
   * @type {number}
   */
  width = 300;

  /**
   * Creates a new `Cloud` instance.
   * Initializes the cloud's position and starts its animation.
   */
  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png'); // Load the initial image for the cloud
    // Set the initial x position of the cloud randomly between -200 and 6000 pixels,
    // with at least 200 pixels distance from the edges.
    this.x = (Math.random() * 6000) + (Math.random() < 0.5 ? -200 : 200); 
    this.animate(); // Start the cloud animation
  }

  /**
   * Animates the cloud by continuously moving it to the left.
   * The cloud moves at a constant speed and is updated every 1/20th of a second.
   */
  animate() {
    setInterval(() => {
      this.moveLeft(); // Move the cloud to the left on the x-axis
    }, 1000 / 20); // Update the cloud's position every 50 milliseconds
  }
}
