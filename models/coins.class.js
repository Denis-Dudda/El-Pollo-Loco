class Coin extends MovableObject {

  IMAGES_WALKING = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png',
  ];

  constructor(){
    super().loadImage('img/8_coin/coin_1.png')
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300;
    this.y = 50;
    this.animate();
  }

  animate() {
    
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 400);
  }




}