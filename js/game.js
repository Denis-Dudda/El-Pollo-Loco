let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  newLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  
}

function startGame() {
  hideScreen();
  showButtons();
  init();
}

function hideScreen(){
  document.getElementById('start-screen').classList.add('d-none');
  document.getElementById('middle-btn').classList.add('d-none');
  document.getElementById('button-cover-container').classList.add('height');
}

function showButtons() {
  document.getElementById('top-btn').classList.remove('d-none');
  document.getElementById('bottom-btn').classList.remove('d-none');
}

function restartGame() {
  clearAllIntervals();
  world = null; // Lösche die alte Instanz
  init();       // Erstelle eine neue Instanz
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

// Tastatursteuerung
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
});



