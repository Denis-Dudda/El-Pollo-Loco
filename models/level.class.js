/**
 * Represents a game level, containing enemies, clouds, background objects, coins, and bottles.
 */
class Level {
  /**
   * An array of enemies present in the level.
   * @type {MovableObject[]}
   */
  enemies;

  /**
   * An array of clouds in the level.
   * @type {Cloud[]}
   */
  clouds;

  /**
   * An array of background objects in the level.
   * @type {BackgroundObject[]}
   */
  backgroundObjects;

  /**
   * The horizontal position where the level ends.
   * @type {number}
   */
  level_end_x = 2900;

  /**
   * An array of collectible coins in the level.
   * @type {Coin[]}
   */
  coins;

  /**
   * An array of collectible bottles in the level.
   * @type {Bottle[]}
   */
  bottles;

  /**
   * Creates a new instance of the `Level` class.
   * 
   * @param {MovableObject[]} enemies - The enemies to populate the level.
   * @param {Cloud[]} clouds - The clouds visible in the level.
   * @param {BackgroundObject[]} backgroundObjects - The background elements of the level.
   * @param {Coin[]} coins - The collectible coins in the level.
   * @param {Bottle[]} bottles - The collectible bottles in the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
