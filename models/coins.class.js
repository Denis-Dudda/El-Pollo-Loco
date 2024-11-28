class Coin extends MovableObject {

  COIN_MOVING = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png',
  ];

  constructor(x, y){
    super().loadImage('img/8_coin/coin_1.png')
    this.loadImages(this.COIN_MOVING);
    this.setCollisionOffsets(25, 45, 25, 65);
    this.x = x;
    this.y = y;
    this.animate();
  }

  animate() { 
    setInterval(() => {
      this.playAnimation(this.COIN_MOVING);
    }, 400);
  }
}