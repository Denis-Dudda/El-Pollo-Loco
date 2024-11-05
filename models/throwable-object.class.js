class ThrowableObject extends MovableObject {

  IMAGES_BOTTLETHROW = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];



  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
    this.loadImages(this.IMAGES_BOTTLETHROW);
    this.loadImages(this.IMAGES_SPLASH);
    this.setCollisionOffsets(0, 0, 0, 0);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.world = world;
    this.throw();
  }

  throw(){   
      this.speedY = 30;
      this.applyGravity();
      setInterval(() => {
       this.x += 10;
       if (this.y > 350) {
          this.playAnimation(this.IMAGES_SPLASH);
          this.x -= 10;
        }else {
          this.playAnimation(this.IMAGES_BOTTLETHROW);
        }
        
     }, 40);
    }

























}