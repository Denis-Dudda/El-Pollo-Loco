class Bottle extends MovableObject {

    width = 80;
    height = 80;

  IMAGES_WALKING = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  constructor(){
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300;
    this.y = 350;
    this.animate();
  }

  animate() {
    
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 400);
  }



}