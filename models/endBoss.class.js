class EndBoss extends MovableObject {
  
  height = 400;
  width = 250;
  y = 55;
  world;
  type = 'endboss';
  test = false;
  energy = 60;
  bossAttack = false;

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ]

  IMAGES_ALERT = [
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
  ];

  IMAGES_HP = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

 

  constructor(world){
    super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
    this.setCollisionOffsets(30, 20, 20, 20);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2700;
    this.animate();
    this.world = world;
    this.healthbar = new StatusBar();
    this.updateHealthbar();
  }

  

  animate() {
     
      setInterval(() => {
        if (this.bossAttack){
          this.speed = 9;
          if (!this.isDead()) {
            this.moveLeft();    
          }
        
      }
      },100);      
    

    
      setInterval(() => {
        if (this.isDead()) {
          this.playAnimation(this.IMAGES_DEAD); // Höchste Priorität: Boss ist tot
        } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT); // Zweithöchste Priorität: Boss ist verwundet
          this.bossAttack = true; // Wechsel in Angriffsmodus
        } else if (this.bossAttack) {
          this.playAnimation(this.IMAGES_WALKING); // Dritthöchste Priorität: Boss greift an
        } else {
          this.playAnimation(this.IMAGES_ALERT); // Standardzustand: Alert
        }
      }, 450);
    }

    updateHealthbar() {
      setInterval(() => {
        this.healthbar.x = this.x;
        this.healthbar.y = this.y;
      }, 60);
    }
    draw(ctx) {
      super.draw(ctx);
      this.healthbar.draw(ctx);
    }
}