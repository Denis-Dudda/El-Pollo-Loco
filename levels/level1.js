let level;


function newLevel() {
  

level1 = new Level(
  [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new EndBoss(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    
  ],
  [
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
  ],
  [
    new BackgroundObject('img/5_background/layers/air.png', -719,),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719,),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719,),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719,),
    new BackgroundObject('img/5_background/layers/air.png', 0,),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0,),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,),
    new BackgroundObject('img/5_background/layers/air.png', 719,),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719,),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719,),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719,),
    new BackgroundObject('img/5_background/layers/air.png', 1438,),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438,),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438,),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438,),
    new BackgroundObject('img/5_background/layers/air.png', 2157,),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2157,),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2157,),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2157,),
    new BackgroundObject('img/5_background/layers/air.png', 2876,),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2876,),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2876,),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2876,),
  ],
  [
    new Coin(600, 100),
    new Coin(750, 40),
    new Coin(900, -20),
    new Coin(1050, 40),
    new Coin(1200, 100),
    new Coin(1600, 100),
    new Coin(1750, 40),
    new Coin(1900, -20),
    new Coin(2050, 40),
    new Coin(2200, 100),
  ],
  [
    new Bottle(450, 350),
    new Bottle(600, 350),
    new Bottle(800, 350),
    new Bottle(1000, 350),
    new Bottle(1200, 350),
  ],



);
}