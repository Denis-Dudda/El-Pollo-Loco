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
  // Dein ursprünglicher Code hier
  document.getElementById('btn-left').addEventListener('mousedown', () => {
    keyboard.LEFT = true;
  });

  document.getElementById('btn-left').addEventListener('mouseup', () => {
    keyboard.LEFT = false;
  });

  // Optional: Wenn der Button verloren geht (z.B. beim Verlassen des Bereichs)
  document.getElementById('btn-left').addEventListener('mouseleave', () => {
    keyboard.LEFT = false;  // Falls der Benutzer den Button loslässt und der Mauszeiger außerhalb ist
  });
});

