class Chicken extends MovableObject {
  x = 120;
  y = 355;
  height = 70;
  width = 60;
  type = 'chicken';
  energy = 20;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  


  constructor(){
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
    this.loadImages(this.IMAGES_WALKING);
    this.x = 1200 + Math.random() * 1300; // sorgt für zufälligen start punkt aber bei mindestens 1200 pixel abstand
    this.animate();
    this.speed = 0.1 + Math.random() * 0.25;
  }


  animate() {
    setInterval(() => {
      this.moveLeft();
    },1000 / 60);
    
    setInterval(() => {
      if (this.isDead()) {
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png')
      }else{this.playAnimation(this.IMAGES_WALKING);}
    }, 200);
  }




}