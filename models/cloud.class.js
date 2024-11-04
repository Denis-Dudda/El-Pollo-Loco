class Cloud extends MovableObject {
  y = 50;
  height = 100;
  width = 300;
  



  constructor(){
    super().loadImage('img/5_background/layers/4_clouds/1.png')

    this.x = (Math.random() * 6000) + (Math.random() < 0.5 ? -200 : 200); // sorgt für zufälligen start punkt aber bei mindestens 200 pixel abstand

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    },1000 / 20);

  }


}