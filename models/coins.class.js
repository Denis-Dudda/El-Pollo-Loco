class Coin extends MovableObject {

  COIN_MOVING = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png',
  ];

  constructor(){
    super().loadImage('img/8_coin/coin_1.png')
    this.loadImages(this.COIN_MOVING);
    this.x = 300;
    this.y = 50;
    this.animate();
  }

  animate() {
    
    setInterval(() => {
      this.playAnimation(this.COIN_MOVING);
    }, 400);
  }




}