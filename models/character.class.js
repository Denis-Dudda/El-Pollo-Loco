class Character extends MovableObject {
  x = 120;
  y = 180;
  height = 250;
  width = 150;
  IMAGES_CHARACTER = [
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
  


  // der constructor wird immer zu erst ausgeführt wenn die klasse neu erstellt wird 
  constructor(){
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
    this.loadImages(this.IMAGES_CHARACTER);
    
    
    this.animate();
  }


  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_CHARACTER.length;
      let path = this.IMAGES_CHARACTER[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 400);
  }


jump(){

}


}