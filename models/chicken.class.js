/**
 * Represents a chicken enemy that moves across the screen and animates its walking behavior.
 * The chicken may die and change its animation to a "dead" state.
 * Extends the `MovableObject` class for movement and animation handling.
 */
class Chicken extends MovableObject {
  
  /**
   * The horizontal position of the chicken on the screen.
   * @type {number}
   */
  x = 120;

  /**
   * The vertical position of the chicken on the screen.
   * @type {number}
   */
  y = 355;

  /**
   * The height of the chicken.
   * @type {number}
   */
  height = 70;

  /**
   * The width of the chicken.
   * @type {number}
   */
  width = 60;

  /**
   * The type of the object, used to identify it as a chicken.
   * @type {string}
   */
  type = 'chicken';

  /**
   * The initial energy value of the chicken.
   * @type {number}
   */
  energy = 20;

  /**
   * An array of image paths representing the walking animation of the chicken.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  /**
   * Creates a new `Chicken` instance.
   * Initializes the chicken's position, speed, and starts its movement and animation.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // Load the first image for walking
    this.loadImages(this.IMAGES_WALKING); // Load all walking images into the image cache
    this.x = 1200 + Math.random() * 1300; // Set the initial x position randomly between 1200 and 2500 pixels
    this.animate(); // Start the chicken's movement and animation
    this.speed = 0.1 + Math.random() * 0.25; // Set the speed of the chicken, randomized between 0.1 and 0.35
  }

  /**
   * Animates the chicken by continuously moving it to the left and updating its animation based on its state.
   * If the chicken is dead, its animation is switched to a "dead" state.
   */
  animate() {
    // Move the chicken left every 1/60th of a second (60 FPS)
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    // Update the chicken's animation every 200 milliseconds (show walking or dead animation)
    setInterval(() => {
      if (this.isDead()) {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png'); // Load the dead image
      } else {
        this.playAnimation(this.IMAGES_WALKING); // Play the walking animation
      }
    }, 200);
  }
}
