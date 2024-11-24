class Character extends MovableObject {
  x = 120;
  y = 180;
  height = 250;
  width = 150;
  speed = 10;
  showLoseImage = false; // lose img
  lastActionTime = Date.now(); // Zeit der letzten Aktion
  isSleeping = false; // Flag, ob der Charakter schläft

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

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

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

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

  waking_sound = new Audio('audio/walking.mp3');

  constructor() {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
    this.setCollisionOffsets(20, 95, 50, 10);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STAY);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
  }

  animate() {
    // Bewegung und Kamera
    setInterval(() => {
      this.waking_sound.pause();

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.waking_sound.play();
        this.lastActionTime = Date.now(); // Reset bei Bewegung
        this.isSleeping = false;
      }

      if (this.world.keyboard.LEFT && this.x > -600) {
        this.moveLeft();
        this.otherDirection = true;
        this.waking_sound.play();
        this.lastActionTime = Date.now(); // Reset bei Bewegung
        this.isSleeping = false;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.lastActionTime = Date.now(); // Reset bei Aktion
        this.isSleeping = false;
      }

      this.world.camera_x = -this.x + 100; // Kamera-Position
    }, 1000 / 60);

    // Animationen
    setInterval(() => {
      const now = Date.now();

      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.world.clearAllIntervals();
          this.showLoseImage = true; // lose img
        }, 400);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        this.lastActionTime = now; // Reset bei Aktion
        this.isSleeping = false;
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.lastActionTime = now; // Reset bei Aktion
        this.isSleeping = false;
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        this.lastActionTime = now; // Reset bei Bewegung
        this.isSleeping = false;
      } else if (now - this.lastActionTime > 5000) {
        this.playAnimation(this.IMAGES_SLEEP);
        this.isSleeping = true;
      } else {
        this.playAnimation(this.IMAGES_STAY);
        this.isSleeping = false;
      }
    }, 150);
  }

  jump() {
    this.speedY = 30;
  }
}
