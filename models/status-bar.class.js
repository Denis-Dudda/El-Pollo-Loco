/**
 * Represents a visual status bar that displays health or progress as an image.
 * Extends the `DrawableObject` class.
 */
class StatusBar extends DrawableObject {

  /**
   * Array of image paths representing the status bar at different percentages.
   * @type {string[]}
   */
  IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  /**
   * The current percentage value of the status bar.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates a new `StatusBar` instance.
   */
  constructor() {
    super(); // Call the constructor of the parent class
    this.loadImages(this.IMAGES); // Preload all status bar images
    this.x = 20; // Horizontal position of the status bar
    this.y = 0; // Vertical position of the status bar
    this.width = 200; // Width of the status bar
    this.height = 60; // Height of the status bar
    this.setPercentage(100); // Initialize the status bar to 100%
  }

  /**
   * Sets the current percentage of the status bar and updates the displayed image.
   * 
   * @param {number} percentage - The percentage value to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    const path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to use based on the current percentage.
   * 
   * @returns {number} The index of the image in the `IMAGES` array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5; // Full health
    } else if (this.percentage >= 80) {
      return 4; // High health
    } else if (this.percentage >= 60) {
      return 3; // Moderate health
    } else if (this.percentage >= 40) {
      return 2; // Low health
    } else if (this.percentage >= 20) {
      return 1; // Critical health
    } else {
      return 0; // No health
    }
  }
}
