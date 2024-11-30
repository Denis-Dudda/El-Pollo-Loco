/**
 * Represents a small chicken enemy in the game.
 * Extends the `MovableObject` class.
 */
class SmallChicken extends MovableObject {
  
  /**
   * The horizontal position of the small chicken.
   * @type {number}
   */
  x = 120;

  /**
   * The vertical position of the small chicken.
   * @type {number}
   */
  y = 355;

  /**
   * The height of the small chicken.
   * @type {number}
   */
  height = 70;

  /**
   * The width of the small chicken.
   * @type {number}
   */
  width = 60;

  /**
   * The type identifier for the small chicken.
   * @type {string}
   */
  type = 'small-chicken';

  /**
   * The energy level of the small chicken.
   * @type {number}
   */
  energy = 20;

  /**
   * Array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  /**
   * Creates a new `SmallChicken` instance.
   * Initializes position, collision offsets, animation, and speed.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    
    // Set a random horizontal position with a minimum offset
    this.x = 1200 + Math.random() * 1300;
    
    // Set collision offsets for the chicken
    this.setCollisionOffsets(10, 10, 10, 10);

    // Start animations
    this.animate();

    // Set a random speed for movement
    this.speed = 0.1 + Math.random() * 0.25;
  }

  /**
   * Starts the animation for the small chicken.
   * Handles movement to the left and animation of walking or dying.
   */
  animate() {
    // Move the chicken to the left at a constant frame rate
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    // Handle walking animation or display dead state
    setInterval(() => {
      if (this.isDead()) {
        // Show the dead chicken image
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
      } else {
        // Play the walking animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
