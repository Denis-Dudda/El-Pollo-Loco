/**
 * Represents a bottle status bar that shows the progress of the bottle count.
 * Extends the `DrawableObject` class for handling the image loading and drawing logic.
 */
class BottleBar extends DrawableObject {

  /**
   * An array of image paths representing different stages of the bottle status bar.
   * Each image corresponds to a specific percentage of the bottle count.
   * @type {string[]}
   */
  IMAGES = [
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',  // 0% bottle
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png', // 20% bottle
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png', // 40% bottle
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png', // 60% bottle
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png', // 80% bottle
    'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',// 100% bottle
  ];

  /**
   * The percentage of the bottle status, starting at 0% and going up to 100%.
   * @type {number}
   */
  percentage = 0;

  /**
   * Creates a new `BottleBar` instance.
   * Initializes the position, dimensions, and sets the bottle bar to 0%.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);  // Load all the bottle status bar images into the cache
    this.x = 20;                   // Set the horizontal position of the bottle bar
    this.y = 100;                  // Set the vertical position of the bottle bar
    this.width = 200;              // Set the width of the bottle bar
    this.height = 60;              // Set the height of the bottle bar
    this.setPercentage(0);         // Set the initial percentage to 0
  }

  /**
   * Sets the percentage of the bottle bar and updates the image accordingly.
   * @param {number} percentage The percentage of the bottle status, ranging from 0 to 100.
   */
  setPercentage(percentage) {
    this.percentage = percentage;  // Update the percentage value
    let path = this.IMAGES[this.resolveImageIndex()];  // Get the image path based on the percentage
    this.img = this.imageCache[path];  // Set the image for the bottle bar
  }

  /**
   * Resolves the image index based on the current percentage of the bottle bar.
   * This method is used to select the appropriate image for the percentage range.
   * @returns {number} The index of the image in the `IMAGES` array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;  // 100% bottle
    } else if (this.percentage >= 80) {
      return 4;  // 80% bottle
    } else if (this.percentage >= 60) {
      return 3;  // 60% bottle
    } else if (this.percentage >= 40) {
      return 2;  // 40% bottle
    } else if (this.percentage >= 20) {
      return 1;  // 20% bottle
    } else {
      return 0;  // 0% bottle
    }
  }
}
