/**
 * Represents the EndBoss in the game.
 * The EndBoss is a powerful enemy that has different states (walking, alert, hurt, dead)
 * and attacks the player. It also has a health bar that updates as the boss takes damage.
 */
class EndBoss extends MovableObject {
  
  /**
   * The height of the EndBoss.
   * @type {number}
   */
  height = 400;

  /**
   * The width of the EndBoss.
   * @type {number}
   */
  width = 250;

  /**
   * The initial vertical position (Y-coordinate) of the EndBoss.
   * @type {number}
   */
  y = 55;

  /**
   * The game world the EndBoss exists in.
   * @type {Object}
   */
  world;

  /**
   * The type of the object. This is set to 'endboss' for this class.
   * @type {string}
   */
  type = 'endboss';

  /**
   * A test flag (could be used for debugging or testing specific behaviors).
   * @type {boolean}
   */
  test = false;

  /**
   * The health of the EndBoss.
   * @type {number}
   */
  energy = 100;

  /**
   * Indicates whether the EndBoss is in an attack state.
   * @type {boolean}
   */
  bossAttack = false;

  /**
   * The current health points (HP) of the EndBoss.
   * @type {number}
   */
  HP = 100;

  boostTime = 1000; // Time duration for speed boost
  nextBoost = Math.random() * 5000 + 2000; // Random interval for the next boost

  /**
   * The images for the walking animation of the EndBoss.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  /**
   * The images for the alert animation of the EndBoss.
   * @type {string[]}
   */
  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  /**
   * The images for the hurt animation of the EndBoss.
   * @type {string[]}
   */
  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  /**
   * The images for the dead animation of the EndBoss.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  /**
   * The images for the health bar of the EndBoss.
   * @type {string[]}
   */
  IMAGES_HP = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  /**
   * Creates an instance of the EndBoss.
   * @param {Object} world The game world where the EndBoss exists.
   */
  constructor(world) {
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.setCollisionOffsets(35, 20, 20, 20); // Set collision area offsets
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2700; // Initial horizontal position
    this.animate(); // Start the animation loop
    this.world = world;
    this.healthbar = new StatusBar(); // Create a health bar for the boss
    this.updateHealthbar(); // Update the health bar position
  }

  /**
   * Starts the animation loop for the EndBoss.
   * Handles speed changes during boosts and animates the boss based on its state (walking, alert, etc.).
   */
  animate() {
    setInterval(() => {
      if (this.bossAttack) {
        this.animateBossSpeed();
        if (!this.isDead()) {
          this.moveLeft();
        }
      }
    }, 100); // Update animation every 100ms
    this.animateIntervalHelper();
  }

  animateBossSpeed(){
    if (this.boostTime > 0) {
      this.speed = 30; // Speed boost during attack
      this.boostTime -= 100; // Decrease boost time
    } else {
      this.speed = 9; // Normal speed after boost
      this.nextBoost -= 100; // Decrease time to next boost
      if (this.nextBoost <= 0) {
        this.boostTime = 1000; // Activate boost for 1 second
        this.nextBoost = Math.random() * 5000 + 1000; // Set new random interval
      }
    }
  }

  /**
   * Handles the animation logic for different states of the EndBoss (dead, hurt, walking, alert).
   * Animates the boss according to its current state and priority.
   */
  animateIntervalHelper() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); // Highest priority: Boss is dead
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT); // Second highest priority: Boss is hurt
        this.bossAttack = true; // Switch to attack mode when hurt
      } else if (this.bossAttack) {
        this.playAnimation(this.IMAGES_WALKING); // Third highest priority: Boss is walking/attacking
      } else {
        this.playAnimation(this.IMAGES_ALERT); // Default state: Boss is in alert mode
      }
    }, 450); // Update animation every 450ms
  }

  /**
   * Updates the position of the health bar to follow the EndBoss.
   */
  updateHealthbar() {
    setInterval(() => {
      this.healthbar.x = this.x; // Align health bar horizontally with EndBoss
      this.healthbar.y = this.y; // Align health bar vertically with EndBoss
    }, 60); // Update health bar position every 60ms
  }

  /**
   * Draws the EndBoss and its health bar on the canvas.
   * @param {CanvasRenderingContext2D} ctx The rendering context of the canvas.
   */
  draw(ctx) {
    super.draw(ctx); // Draw the EndBoss image
    this.healthbar.draw(ctx); // Draw the health bar
  }
}
