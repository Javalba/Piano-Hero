class Board {
  constructor(Keyboard, Song, rows, columns) {
    this.keyboard = Keyboard;
    this.song = Song;
    this.rows = rows;
    this.columns = columns;
    this.score = 0; // counter score points
    this.hits = 0; //counter success hits
    this.fails = 0; //counter failure hits

    //Piano keys eventsA
    this.assignControlsToKeys();
  }

  addSuccessHit(hits) {
    this.hits = this.hits + hits;
  }

  addFailureHit(hits) {
    this.fails = this.fails + hits;
  }

  addPoints(points) {
    this.score = this.score + points;
  }
  substractPoints(points) {
    this.score = this.score - points;
  }

  // CONSTRUCT BOARD  & KEYS SUCCESS/FAIL
  buildSong() {

    let btnRestart = document.getElementsByClassName('score-btn-restart');
    btnRestart[0].style.display = 'none';
    for (let i = 0; i < this.rows; i++) {
      let currentDiv = document.getElementsByClassName('sheet');
      for (let j = 0; j < this.columns; j++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("cell");
        newDiv.setAttribute('data-row', i);
        newDiv.setAttribute('data-col', j);
        // let currentDiv = document.getElementsByClassName('sheet');
        currentDiv[0].append(newDiv);
      }
    }

    let cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach(cell => cell.addEventListener('transitionend', this.removeTransCell));
    let points = document.getElementsByClassName('container-points');
    points[0].addEventListener('transitionend', this.removeTransPoints);
  }

  set setScore(points) {
    this.score = points;
  }

  get getScore() {
    return this.score;
  }

  get getPercentage() {
    /*return (this.hits / this.song.notes.length) * 100;*/
    return (this.score/((this.song.notes.length)*5)*100);
  }

  update() {
    this.printSong();
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(this.update.bind(this), 650);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  finish() {
    let el = document.querySelector('.sheet');
    let hits = document.getElementsByClassName('score-hits');
    let failure = document.getElementsByClassName('score-failure');
    let percentage = document.getElementsByClassName('score-percentage');
    let btnRestart = document.getElementsByClassName('score-btn-restart');
    hits[0].innerHTML = `Hits: ${this.hits}/${this.song.notes.length}`;
    failure[0].innerHTML = `Failures: ${this.fails}`;
    percentage[0].innerHTML = `Percentage: ${this.getPercentage.toFixed(1)}%`;
    btnRestart[0].style.display = "block";
    btnRestart[0].innerText = "Restart";
    btnRestart[0].onclick = function() {
      location.href = "../index.html";
    };
    window.removeEventListener('keydown',this.keyboardListener,true);
    
  }

  assignControlsToKeys() {
    window.addEventListener('keydown', this.keyboardListener.bind(this));
  }

  keyboardListener(e) {
      switch (e.keyCode) {
        case 80: // p pause
          if (this.intervalId) {
            this.stop();
            let el = document.getElementsByClassName('score-pause');
            el[0].innerHTML = "PAUSE";
            //$('*').off('keyup keydown keypress');
          } else {
            this.start();
            let el = document.getElementsByClassName('score-pause');
            el[0].innerHTML = "";
          }
          break;
        case 65: // a
          this.checkNote(0);
          break;
        case 83: // s
          this.checkNote(1);
          break;
        case 68: // d
          this.checkNote(2);
          break;
        case 70: //f
          this.checkNote(3);
          break;
        case 71: //g
          this.checkNote(4);
          break;
        case 72: //h
          this.checkNote(5);
          break;
        case 74: //j
          this.checkNote(6);
          break;
        case 75: //k
          this.checkNote(7);
          break;
        default:
      }
    }

  /**
   * this.song.positionArray --> index of array
   * this.song.tempo --> times of notes
   * this.song.notes --> notes of song
   * @return {[type]}
   */
  printSong() {
    for (let i = this.song.positionArray; i > 0; i--) {
      let prev = document.querySelector(`[data-row="${this.song.tempo[i-1]-1}"][data-col="${this.song.notes[i-1]}"]`);
      if (prev &&  this.song.notes[i-1] !== this.song.notes[i]) prev.classList.remove("notes");
      let next = document.querySelector(`[data-row="${this.song.tempo[i-1]}"][data-col="${this.song.notes[i-1]}"]`);
      if (next) next.classList.add('notes');
      this.song.tempo[i - 1]++;
    }
    if (this.song.notes.length > this.song.positionArray) {
      this.song.tempo[this.song.positionArray]++;
      this.song.positionArray++;
    }
    let element = document.querySelector(`[data-row="${this.song.tempo[this.song.positionArray]}"][data-col="${this.song.notes[this.song.positionArray]}"]`);
    if (element) {
      element.classList.add("notes");
    }
    if (this.song.tempo[this.song.tempo.length - 1] === this.rows + 1) {
      this.finish();
    }
  }


  checkNote(note) {
    let keyPressed = document.querySelector(`[data-row="${rows-1}"][data-col="${note}"]`);
    if (!keyPressed) return;

    //HIT
    if (keyPressed.classList.contains("notes")) {
      keyPressed.classList.add("notes-success");
      let pointsDiv = document.getElementsByClassName('container-points');
      pointsDiv[0].innerHTML = "+5";
      pointsDiv[0].classList.add("points-success")
      this.addPoints(5);
      this.addSuccessHit(1);
      let scoreDiv = document.getElementById("score-counter");
      scoreDiv.innerHTML = this.getScore;
    }
    //FAILURE
    else {
      let pointsDiv = document.getElementsByClassName('container-points');
      pointsDiv[0].innerHTML = "-1";
      //pointsDiv[0].classList.remove('points-failure');
      pointsDiv[0].classList.add("points-failure")
      this.substractPoints(1);
      this.addFailureHit(1);
      let scoreDiv = document.getElementById("score-counter");
      scoreDiv.innerHTML = this.getScore;

    }
  }

  removeTransCell(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('notes-success');
    // if (e.propertyName === 'transform') this.hola();
  }

  removeTransPoints(e) {
    e.target.classList.remove('points-success');
    e.target.classList.remove('points-failure');
    let pointsDiv = document.getElementsByClassName('container-points');
    pointsDiv[0].innerHTML = "";
  }

}


// const notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b', '2'];
const rows = 8;
const cols = 8;
const keys = Array.from(document.querySelectorAll('.key')); // key's array
const val = 0;
let song="";
const songs = ["ggag2bggag2bggge2baffecdc","eeeeeeegcdefffffeeeeeddedgeeeeeeegcdefffffeeeeggfdc"];
let urlParameter = window.location.search;
let songSelected = urlParameter.split('=')[1];

if(songSelected==="z"){
  songSelected = urlParameter.split('=')[2];
  song = new Song(songSelected);
}
else{
  songSelected = parseInt(songSelected);
  song = new Song(songs[songSelected]);
}

const keyboard = new Keyboard(keys);
const game = new Board(keyboard, song, rows, cols);
game.buildSong();
game.start();
