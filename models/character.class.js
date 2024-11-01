class Character extends MovableObject {
  x = 120;
  y = 180;
  height = 250;
  width = 150;
  speed = 10;
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

  world;
  waking_sound = new Audio('audio/walking.mp3')


  // der constructor wird immer zu erst ausgeführt wenn die klasse neu erstellt wird 
  constructor(){
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.applyGravity();
    this.animate();
  }


  animate() {
    
    // animation für die seiten bewegung 
    setInterval(() => {
      this.waking_sound.pause();
      if (this.world,keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.waking_sound.play();
      }

      if (this.world,keyboard.LEFT && this.x > -600) {
        this.moveLeft();
        this.otherDirection = true;
        this.waking_sound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100; // wo sich der character befindet jetzt 100 pixel links vom rand 
    }, 1000 / 60);

    // animation für sie bilder die angezeigt werden z.b das gehen 
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }else{

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
    }, 50);
  }


jump(){
  this.speedY = 30;
}


}