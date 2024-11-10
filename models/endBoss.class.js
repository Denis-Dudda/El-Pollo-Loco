class EndBoss extends MovableObject {
  
  height = 400;
  width = 250;
  y = 55;
  world;
  status = 'normal';
  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',

  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  constructor(world){
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png')
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.x = 700;
    this.animate();
    this.world = world;
    
  }


  animate() {
    this.moveLeft();
    setInterval(() => {
      if (this.isHurt()) {                    //////////// funzt noch nicht weil hurt nicht auf true geht läd aber bilder usw.
        this.playAnimation(this.IMAGES_HURT);
        
      }else{
      this.playAnimation(this.IMAGES_WALKING);
      }
    }, 450);
  
  }




}