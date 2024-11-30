/**
 * Initializes a new game level by creating instances of enemies, clouds, background objects, coins, and bottles.
 * Each category (enemies, clouds, etc.) is populated with predefined objects to form the level layout.
 * This function creates and assigns these objects to a `Level` instance, which represents the full level's content.
 */
function newLevel() {

  /**
   * The first level of the game, which includes various elements such as enemies, background layers,
   * collectible items (coins, bottles), and clouds.
   * 
   * @type {Level}
   */
  level1 = new Level(
    // Enemies: An array of different enemies to be placed in the level.
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

    // Clouds: A collection of cloud objects to appear in the background of the level.
    [
      new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(),
      new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(),
      new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud(),
      new Cloud(), new Cloud(), new Cloud(), new Cloud(),
    ],

    // Background Objects: An array of layered background images for the level.
    [
      new BackgroundObject('img/5_background/layers/air.png', -719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/air.png', 719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/air.png', 1438),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1438),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1438),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1438),
      new BackgroundObject('img/5_background/layers/air.png', 2157),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 2157),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 2157),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 2157),
      new BackgroundObject('img/5_background/layers/air.png', 2876),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2876),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2876),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2876),
    ],

    // Coins: An array of coin objects with predefined positions.
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

    // Bottles: An array of bottle objects with predefined positions.
    [
      new Bottle(450, 350),
      new Bottle(750, 350),
      new Bottle(1100, 350),
      new Bottle(1400, 350),
      new Bottle(2000, 350),
    ],
  );
}
