class MovableObject {
  x = 120;
  y = 250;
  width = 150;
  height = 100;
  img;

  loadImage(path){
    this.img = new Image(); // Image muss nicht neu definiert werden kommt vom js
    this.img.src = path; // der datei pfad den wir übergeben bekommen mit funktions aufruf
  }

  moveRight(){
    console.log('Moving right');
  }

  moveLeft(){

  }

}