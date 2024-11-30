/**
 * Represents a coin progress bar that shows the player's progress in collecting coins.
 * Extends the `DrawableObject` class to handle image loading and drawing.
 */
class CoinBar extends DrawableObject {

  /**
   * An array of image paths representing the different stages of the coin progress bar.
   * Each image corresponds to a specific percentage of collected coins.
   * @type {string[]}
   */
  IMAGES = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ];

  /**
   * The current percentage of collected coins (0-100).
   * @type {number}
   */
  percentage = 0;

  /**
   * Creates a new `CoinBar` instance.
   * Initializes the bar's position, size, and percentage of collected coins.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);  // Load all the coin bar images
    this.x = 20;                   // Set the x position of the coin bar
    this.y = 50;                   // Set the y position of the coin bar
    this.width = 200;              // Set the width of the coin bar
    this.height = 60;              // Set the height of the coin bar
    this.setPercentage(0);         // Initialize the percentage to 0
  }

  /**
   * Updates the percentage of collected coins and changes the image displayed based on the new percentage.
   * 
   * @param {number} percentage - The new percentage of coins collected (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;           // Update the percentage
    let path = this.IMAGES[this.resolveImageIndex()]; // Get the appropriate image for the current percentage
    this.img = this.imageCache[path];       // Set the image of the coin bar
  }

  /**
   * Resolves the index of the image based on the current percentage of collected coins.
   * 
   * @returns {number} The index of the image corresponding to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
