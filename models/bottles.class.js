class Bottle extends MovableObject {

    width = 80;
    height = 80;

  BOTTLE_MOVING = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ];

  constructor(x, y){
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
    this.loadImages(this.BOTTLE_MOVING);
    this.setCollisionOffsets(20, 15, 15, 10);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() {
    
    setInterval(() => {
      this.playAnimation(this.BOTTLE_MOVING);
    }, 400);
  }



}