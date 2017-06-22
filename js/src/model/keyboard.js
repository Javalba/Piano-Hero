
class Keyboard {

    constructor (keys) {
        this.keys = keys;

        //keys.forEach(key => key.addEventListener('keydown', playSound));
        //Add eventListener to mouseClick for each key
        this.keys.forEach(function(key) {
          key.addEventListener('click', playKey);
        });
        window.addEventListener('keydown', playSound);
        window.addEventListener('keydown', activeKeydown);
        window.addEventListener("keyup", activateKeyup);
    }

}



/**
 * play sound key
 * @param  {[type]} key
 * @return {[type]}
 */
 function playSound(key) {
  let keyCode;
  if (!key.repeat) keyCode = key.keyCode; // keydown event call
  else keyCode = key; // playKey function call

  let audio = document.querySelector(`audio[data-key="${keyCode}"]`); //compare if keycode is anyone of keycode octave's
  if (!audio) return;
  audio.currentTime = 0; // rewind to the start
  audio.play();
}

/**
 * When click mouse, get data-key attrb and call playSound
 * @param  {[type]} e
 * @return {[type]}
 */
 function playKey(e) {
  let attribute = this.getAttribute("data-key");
  playSound(attribute);
}

/**
 * activate key effect when key is pressed
 * @param  {[type]} e
 * @return {[type]}
 */
function activeKeydown(e) {
  let keyPressed = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!keyPressed) return;
  // console.log(keyPressed);

  if (keyPressed.classList.contains("white")) {
    keyPressed.classList.add("white-active");
  }
  if (keyPressed.classList.contains("black")) {
    keyPressed.classList.add("black-active");
  }
}

/**
 * activate key effect when key is up
 * @param  {[type]} e
 * @return {[type]}
 */

function activateKeyup(e) {
  let keyUp = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!keyUp) return;
  // console.log("keyup------", keyUp);

  if (keyUp.classList.contains("white-active")) {
    keyUp.classList.remove("white-active");
  }
  if (keyUp.classList.contains("black-active")) {
    keyUp.classList.remove("black-active");
  }
}



// const chicken_breast = new Food('Chicken Breast', 26, 0, 3.5);

// chicken_breast.print(); // 'Chicken Breast | 26g P :: 0g C :: 3.5g F'
// console.log(chicken_breast.protein); // 26 (LINE A)
