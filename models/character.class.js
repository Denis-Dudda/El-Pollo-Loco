class Character extends MovableObject {
  x = 120;
  y = 180;
  height = 250;
  width = 150;


  // der constructor wird immer zu erst ausgeführt wenn die klasse neu erstellt wird 
  constructor(){
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
  }

jump(){

}


}