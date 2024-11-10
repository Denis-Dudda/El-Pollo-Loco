class EndBoss extends MovableObject {
  
  height = 400;
  width = 250;
  y = 55;
  world;
  type = 'endboss';
  test = false;
  energy = 60;
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

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ]

  constructor(world){
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png')
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3300;
    this.animate();
    this.world = world;
    
  }


  animate() {
    this.moveLeft();
    setInterval(() => {
        
        
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }else{this.playAnimation(this.IMAGES_WALKING);}
      if (this.isHurt()) {                    
        this.playAnimation(this.IMAGES_HURT);
        
      }

    }, 450);
  
  }




}