/**
 * The canvas element used to render the game world.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The world instance that holds all the game logic and entities.
 * @type {World}
 */
let world;

/**
 * The keyboard object for tracking keyboard inputs.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Flag indicating whether all sounds are muted.
 * @type {boolean}
 */
let allSoundsMute = false;

/**
 * Initializes the game by setting up a new level and the world instance.
 */
function init() {
  newLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

/**
 * Clears all intervals from the game loop.
 * Loops through and clears intervals with ids from 1 to 9999.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Event listener for keyboard press events.
 * Updates the keyboard state when specific keys are pressed.
 */
window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Event listener for keyboard release events.
 * Updates the keyboard state when specific keys are released.
 */
window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Event listener for DOMContentLoaded event.
 * Sets up the event listeners for touch and mouse controls.
 */
document.addEventListener("DOMContentLoaded", function() {
  // Buttons holen
  const btnLeft = document.getElementById('btn-left');
  const btnRight = document.getElementById('btn-right');
  const btnD = document.getElementById('btn-d');
  const btnSpace = document.getElementById('btn-space');

  // Event Listener für "left" Button
  btnLeft.addEventListener('mousedown', () => {
    keyboard.LEFT = true;  // Taste gedrückt
  });

  btnLeft.addEventListener('mouseup', () => {
    keyboard.LEFT = false;  // Taste losgelassen
  });

  btnLeft.addEventListener('touchstart', (e) => {
    e.preventDefault();  // Verhindert den Standardverhalten
    keyboard.LEFT = true;  // Taste gedrückt
  });

  btnLeft.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;  // Taste losgelassen
  });

  // Event Listener für "right" Button
  btnRight.addEventListener('mousedown', () => {
    keyboard.RIGHT = true;  // Taste gedrückt
  });

  btnRight.addEventListener('mouseup', () => {
    keyboard.RIGHT = false;  // Taste losgelassen
  });

  btnRight.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;  // Taste gedrückt
  });

  btnRight.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;  // Taste losgelassen
  });

  // Event Listener für "D" Button
  btnD.addEventListener('mousedown', () => {
    keyboard.D = true;  // Taste gedrückt
  });

  btnD.addEventListener('mouseup', () => {
    keyboard.D = false;  // Taste losgelassen
  });

  btnD.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;  // Taste gedrückt
  });

  btnD.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;  // Taste losgelassen
  });

  // Event Listener für "Space" Button
  btnSpace.addEventListener('mousedown', () => {
    keyboard.SPACE = true;  // Taste gedrückt
  });

  btnSpace.addEventListener('mouseup', () => {
    keyboard.SPACE = false;  // Taste losgelassen
  });

  btnSpace.addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;  // Taste gedrückt
  });

  btnSpace.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;  // Taste losgelassen
  });
  btnSpace.addEventListener('click', (e) => {
    e.target.blur(); // Entfernt den Fokus nach Klick
  });
  btnLeft.addEventListener('click', (e) => {
    e.target.blur(); // Entfernt den Fokus nach Klick
  });
  btnRight.addEventListener('click', (e) => {
    e.target.blur(); // Entfernt den Fokus nach Klick
  });
  btnD.addEventListener('click', (e) => {
    e.target.blur(); // Entfernt den Fokus nach Klick
  });
  document.getElementById('mute-btn').addEventListener('click', (e) => {
    e.target.blur(); // Entfernt den Fokus nach Klick
  });
  document.getElementById('btn-restart').addEventListener('click', (e) => {
    e.target.blur(); // Entfernt den Fokus nach Klick
  });
});

/**
 * Starts the game by hiding the start screen, showing buttons, and initializing the game.
 */
function startGame() {
  hideScreen();
  showButtons();
  init();
  showBottomButton();
}

/**
 * Hides the start screen and middle button container.
 */
function hideScreen(){
  hideId('start-screen');
  hideId('middle-btn');
  document.getElementById('button-cover-container').classList.add('height');
}

/**
 * Hides the info screen and shows the middle button.
 */
function hideInfo() {
  hideId('info-screen');
  showId('middle-btn');
}

/**
 * Shows the top button.
 */
function showButtons() {
  showId('top-btn');
}

/**
 * Shows the bottom button with a z-index style.
 */
function showBottomButton() {
  document.getElementById('bottom-btn').classList.add('z-index');
}

/**
 * Restarts the game by stopping the current game music, clearing all intervals, and reinitializing the game.
 */
function restartGame() {
  
  
  clearAllIntervals();
  world = null; // Lösche die alte Instanz
  init();       // Erstelle eine neue Instanz
  hideId('btn-restart');
  
}

/**
 * Checks whether sounds are muted and resets the mute flag.
 */
function checkSounds(){

  
  
}

/**
 * Shows the info screen and hides the middle button.
 */
function showInfo() {
  hideId('middle-btn');
  showId('info-screen');
}

/**
 * Shows the impressum screen and hides the middle button.
 */
function showImpressum() {
  hideId('middle-btn');
  showId('impressum-screen');
}

/**
 * Hides the impressum screen and shows the middle button.
 */
function hideImpressum(){
  hideId('impressum-screen');
  showId('middle-btn');
}

/**
 * Hides an element by its id.
 * @param {string} id - The id of the element to hide.
 */
function hideId(id) {
  document.getElementById(id).classList.add('d-none');
}

/**
 * Shows an element by its id.
 * @param {string} id - The id of the element to show.
 */
function showId(id) {
  document.getElementById(id).classList.remove('d-none');
}

/**
 * Mutes or unmutes all game sounds.
 */
function muteSounds(){
  allSoundsMute = !allSoundsMute;
  world.allSounds.forEach((audio) => {
    if (!allSoundsMute) {
      audio.pause();  
    } else {
      audio.play();
    }
  });
}
