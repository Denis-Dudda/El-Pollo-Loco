/**
 * Represents the EndBoss in the game.
 * The EndBoss is a powerful enemy that has various states (walking, alert, hurt, dead),
 * attacks the player, and features a health bar that dynamically updates as it takes damage.
 * It inherits from the `MovableObject` class.
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
   * The game world that the EndBoss exists in.
   * @type {Object}
   */
  world;

  /**
   * The type of the object. For the EndBoss, it is set to 'endboss'.
   * @type {string}
   */
  type = 'endboss';

  /**
   * A test flag, potentially used for debugging or testing purposes.
   * @type {boolean}
   */
  test = false;

  /**
   * The health (energy) level of the EndBoss.
   * @type {number}
   */
  energy = 100;

  /**
   * Indicates whether the EndBoss is currently in an attack state.
   * @type {boolean}
   */
  bossAttack = false;

  /**
   * The current health points (HP) of the EndBoss.
   * @type {number}
   */
  HP = 100;

  /**
   * The duration for which the EndBoss receives a speed boost during attack (in milliseconds).
   * @type {number}
   */
  boostTime = 1000;

  /**
   * The time interval until the next speed boost (in milliseconds).
   * @type {number}
   */
  nextBoost = Math.random() * 5000 + 2000;

  /**
   * Array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  /**
   * Array of image paths for the alert animation.
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
   * Array of image paths for the hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  /**
   * Array of image paths for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  /**
   * Array of image paths for the health bar.
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
   * @param {Object} world - The game world where the EndBoss exists.
   */
  constructor(world) {
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.setCollisionOffsets(35, 20, 20, 20);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2700; // Initial position
    this.animate();
    this.world = world;
    this.healthbar = new StatusBar();
    this.updateHealthbar();
  }

  /**
   * Starts the animation loop for the EndBoss.
   * Manages speed boosts and animations based on the boss's state (walking, alert, etc.).
   */
  animate() {
    setInterval(() => {
      if (this.bossAttack) {
        this.animateBossSpeed();
        if (!this.isDead()) {
          this.moveLeft();
        }
      }
    }, 100);
    this.animateIntervalHelper();
  }

  /**
   * Handles the speed boost logic for the EndBoss.
   * Alternates between a boosted and normal speed based on timing intervals.
   */
  animateBossSpeed() {
    if (this.boostTime > 0) {
      this.speed = 30; // Boosted speed
      this.boostTime -= 100;
    } else {
      this.speed = 9; // Normal speed
      this.nextBoost -= 100;
      if (this.nextBoost <= 0) {
        this.boostTime = 1000; // Reset boost duration
        this.nextBoost = Math.random() * 5000 + 1000;
      }
    }
  }

  /**
   * Handles animation updates for the EndBoss based on its state (e.g., hurt, dead, walking).
   * The animation state is prioritized in the following order:
   * 1. Dead
   * 2. Hurt
   * 3. Walking/Attacking
   * 4. Alert
   */
  animateIntervalHelper() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.bossAttack = true;
      } else if (this.bossAttack) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 450);
  }

  /**
   * Updates the position of the health bar to match the EndBoss's position.
   */
  updateHealthbar() {
    setInterval(() => {
      this.healthbar.x = this.x;
      this.healthbar.y = this.y;
    }, 60);
  }

  /**
   * Draws the EndBoss and its health bar on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  draw(ctx) {
    super.draw(ctx);
    this.healthbar.draw(ctx);
  }
}
