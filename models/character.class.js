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
  world;


  // der constructor wird immer zu erst ausgeführt wenn die klasse neu erstellt wird 
  constructor(){
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
    this.loadImages(this.IMAGES_WALKING);
    
    
    this.animate();
  }


  animate() {
    // animation für die seiten bewegung 
    setInterval(() => {
      if (this.world,keyboard.RIGHT) {
      this.x += this.speed;
      this.otherDirection = false;
      }

      if (this.world,keyboard.LEFT) {
      this.x -= this.speed;
      this.otherDirection = true;
      }
    }, 1000 / 60);

    // animation für sie bilder die angezeigt werden z.b das gehen 
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 50);
  }


jump(){

}


}