/**
 * Represents a throwable object, such as a bottle, in the game.
 * This class extends the MovableObject class and is responsible for managing the bottle's throw,
 * its animations, and its collision detection.
 */
class ThrowableObject extends MovableObject {

  /**
   * Images representing the bottle's rotation during a throw.
   * @type {string[]}
   */
  IMAGES_BOTTLETHROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Images representing the splash effect when the bottle hits the ground.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of the ThrowableObject (bottle) and initializes its properties.
   * @param {number} x - The initial x position of the bottle.
   * @param {number} y - The initial y position of the bottle.
   */
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLETHROW);
    this.loadImages(this.IMAGES_SPLASH);
    this.setCollisionOffsets(0, 0, 0, 0); // Set the collision area offsets for the object.
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.world = world; // Assign the world reference to the object.
    this.throw(); // Start the throwing animation and physics.
  }

  /**
   * Initiates the throwing action for the bottle, applying gravity and moving the bottle
   * horizontally based on the direction the character is facing.
   */
  throw() {
    this.speedY = 30; // Vertical speed of the throw.
    this.applyGravity(); // Apply gravity to the bottle's movement.

    // Move the bottle horizontally based on the character's direction.
    if (this.world.character.otherDirection) {
      setInterval(() => {
        this.x -= 10; // Move left if the character is facing left.
      }, 40);
    } else {
      setInterval(() => {
        this.x += 10; // Move right if the character is facing right.
      }, 40);
    }

    // Change the animation of the bottle based on its vertical position.
    setInterval(() => {
      if (this.world.character.otherDirection && this.y > 350) {
        // Play splash animation if the bottle hits the ground and the character is facing left.
        this.playAnimation(this.IMAGES_SPLASH);
        this.x += 10;
      } else if (!this.world.character.otherDirection && this.y > 350) {
        // Play splash animation if the bottle hits the ground and the character is facing right.
        this.playAnimation(this.IMAGES_SPLASH);
        this.x -= 10;
      } else {
        // Play throwing animation while the bottle is in the air.
        this.playAnimation(this.IMAGES_BOTTLETHROW);
      }
    }, 40); // Update every 40ms for smooth animation.
  }
}
