/**
 * Character class representing a movable character in the game.
 * Inherits from the MovableObject class.
 */
class Character extends MovableObject {
  /**
   * @constructor
   * Initializes the character's properties and animations.
   */
  constructor() {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.setCollisionOffsets(20, 135, 50, 50);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STAY);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
    this.characterPosition();
  }

  /**
   * @type {number} The x position of the character.
   */
  x = 120;

  /**
   * @type {number} The y position of the character.
   */
  y = 180;

  /**
   * @type {number} The height of the character.
   */
  height = 250;

  /**
   * @type {number} The width of the character.
   */
  width = 150;

  /**
   * @type {number} The speed of the character.
   */
  speed = 10;

  /**
   * @type {boolean} Flag to display the lose image when the character is dead.
   */
  showLoseImage = false;

  /**
   * @type {number} The timestamp of the last action.
   */
  lastActionTime = Date.now();

  /**
   * @type {boolean} Flag to determine if the character is sleeping.
   */
  isSleeping = false;

  /**
   * Array of images for the walking animation.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  /**
   * Array of images for the jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  /**
   * Array of images for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  /**
   * Array of images for the hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  /**
   * Array of images for the stay animation.
   * @type {string[]}
   */
  IMAGES_STAY = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  /**
   * Array of images for the sleep animation.
   * @type {string[]}
   */
  IMAGES_SLEEP = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  /**
   * Sound for walking.
   * @type {Audio}
   */
  waking_sound = new Audio('audio/walking.mp3');

  /**
   * Sound for jumping.
   * @type {Audio}
   */
  jump_sound = new Audio('audio/jump-sound.mp3');

  /**
   * Main game loop for animation and actions.
   * Handles all movement and animation logic for the character.
   */
  animate() {
    // Bewegung und Kamera
    setInterval(() => {
      this.waking_sound.pause();
      this.animateHelperMoveLeftRight();
      this.animateHelperJumpAndSleep();
    }, 1000 / 60);

    // Animationen
    setInterval(() => {
      const now = Date.now();
      if (this.isDead()) {
        this.playDead();
      } else if (this.isHurt()) {
        this.playHurt(now);
      } else if (this.isAboveGround()) {
        this.playJump(now);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playWalk(now);
      } else if (now - this.lastActionTime > 5000) {
        this.playSleep();
      } else {
        this.playStay();
      }
    }, 150);
  }

  /**
   * Plays the "dead" animation and shows the lose screen after the animation.
   */
  playDead() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.world.clearAllIntervals();
      this.showLoseImage = true; // lose img
      document.getElementById('btn-restart').classList.remove('d-none');
    }, 400);
  }

  /**
   * Plays the "hurt" animation when the character is hurt.
   * @param {number} now - The current timestamp of the action.
   */
  playHurt(now) {
    this.playAnimation(this.IMAGES_HURT);
    this.lastActionTime = now; // Reset bei Aktion
    this.isSleeping = false;
  }

  /**
   * Plays the "jump" animation when the character jumps.
   * @param {number} now - The current timestamp of the action.
   */
  playJump(now) {
    this.playAnimation(this.IMAGES_JUMPING);
    this.lastActionTime = now; // Reset bei Aktion
    this.isSleeping = false;
  }

  /**
   * Plays the "walk" animation when the character is moving.
   * @param {number} now - The current timestamp of the action.
   */
  playWalk(now) {
    this.playAnimation(this.IMAGES_WALKING);
    this.lastActionTime = now; // Reset bei Bewegung
    this.isSleeping = false;
  }

  /**
   * Plays the "sleep" animation when the character is idle for more than 5 seconds.
   */
  playSleep() {
    this.playAnimation(this.IMAGES_SLEEP);
    this.isSleeping = true;
  }

  /**
   * Plays the "stay" animation when the character is idle.
   */
  playStay() {
    this.playAnimation(this.IMAGES_STAY);
    this.isSleeping = false;
  }

  /**
   * Helper function for moving the character left or right based on keyboard input.
   */
  animateHelperMoveLeftRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (allSoundsMute) {
        this.waking_sound.play();
      }
      this.lastActionTime = Date.now(); // Reset bei Bewegung
      this.isSleeping = false;
    }
    if (this.world.keyboard.LEFT && this.x > -600) {
      this.moveLeft();
      this.otherDirection = true;
      if (allSoundsMute) {
        this.waking_sound.play();
      }
      this.lastActionTime = Date.now(); // Reset bei Bewegung
      this.isSleeping = false;
    }
  }

  /**
   * Helper function for handling the jump and sleep logic based on keyboard input.
   */
  animateHelperJumpAndSleep() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      if (allSoundsMute) {
        this.jump_sound.play();
      }
      this.lastActionTime = Date.now(); // Reset bei Aktion
      this.isSleeping = false;
    }
    this.world.camera_x = -this.x + 100; // Kamera-Position
  }

  /**
   * Keeps the character's position within a defined range.
   */
  characterPosition() {
    setInterval(() => {
      if (this.y > 180) {
        this.y = 180;
      }
    }, 10);
  }

  /**
   * Makes the character jump by applying an upward force.
   */
  jump() {
    this.speedY = 30;
  }
}
