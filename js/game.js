let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  console.log('my character is', world.character);
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
  // Sicherstellen, dass das Element mit der ID btn-left verfügbar ist
  const btnLeft = document.getElementById('btn-left');

  // Event Listener für Desktop (Maus)
  btnLeft.addEventListener('mousedown', () => {
    keyboard.LEFT = true;  // Taste gedrückt
  });

  btnLeft.addEventListener('mouseup', () => {
    keyboard.LEFT = false;  // Taste losgelassen
  });

  // Optional: Wenn der Mauszeiger das Element verlässt
  btnLeft.addEventListener('mouseleave', () => {
    keyboard.LEFT = false;  // Taste losgelassen
  });

  // Event Listener für mobile Geräte (Touch)
  btnLeft.addEventListener('touchstart', (e) => {
    e.preventDefault();  // Verhindert, dass der Browser das Touch-Event zusätzlich verarbeitet
    keyboard.LEFT = true;  // Taste gedrückt
  });

  btnLeft.addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;  // Taste losgelassen
  });

  // Optional: Wenn der Touch den Button verlässt
  btnLeft.addEventListener('touchcancel', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;  // Taste losgelassen
  });
});


