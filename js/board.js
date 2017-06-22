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
    // window.addEventListener('keydown', activeKeydown);
    // window.addEventListener("keyup", activateKeyup);
  }

  addSuccessHit(hits){
    this.hits = this.hits + hits;
  }

  addFailureHit(hits){
    this.fails = this.fails + hits;
  }

  addPoints(points){
    this.score = this.score + points;
  }
  substractPoints(points){
    this.score = this.score - points;
  }

  // CONSTRUCT BOARD  & KEYS SUCCESS/FAIL
  buildSong() {
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

  // get score() {
  //   return this.score;
  // }

  set setScore(points) {
      this.score = points;   // validation could be checked here such as only allowing non numerical values
  }

  get getScore() {
  return this.score; }

  update() {
    this.printSong();
    // console.log('hello');
    //console.log(this.song);
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(this.update.bind(this), 400);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  finish(){
    let el = document.querySelector('.sheet');
     //div.classList.contains("notes");
    //el.style.display = 'none';
    // alert("Finish");
  }

  assignControlsToKeys() {
    $('body').on('keydown', function(e) {
      switch (e.keyCode) {
        case 80: // p pause
          if (this.intervalId) {
            this.stop();
          } else {
            this.start();
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
    }.bind(this));
  }

  /**
   * this.song.positionArray --> index of array
   * this.song.tempo --> times of notes
   * this.song.notes --> notes of song
   * @return {[type]}
   */

  printSong() {
    let element = document.querySelector(`[data-row="${this.song.tempo[this.song.positionArray]}"][data-col="${this.song.notes[this.song.positionArray]}"]`);
    if (element) {
      element.classList.add("notes");
    }

    for (let i = this.song.positionArray; i > 0; i--) {
      let prev = document.querySelector(`[data-row="${this.song.tempo[i-1]-1}"][data-col="${this.song.notes[i-1]}"]`);
      if (prev) prev.classList.remove("notes");
      let next = document.querySelector(`[data-row="${this.song.tempo[i-1]}"][data-col="${this.song.notes[i-1]}"]`);
      if (next) next.classList.add('notes');
      this.song.tempo[i - 1]++;
    }
    if (this.song.notes.length > this.song.positionArray) {
      this.song.tempo[this.song.positionArray]++;
      this.song.positionArray++;
    }
    if (this.song.tempo[this.song.tempo.length - 1] === this.rows + 1) {
      this.finish();}
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
      scoreDiv.innerHTML = this.getScore  ;
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
const songs = ["cdefgab2", "ggag2bggagcbgggecbaffecdc"];


const keyboard = new Keyboard(keys);
let song = new Song(songs[0]);
const game = new Board(keyboard, song, rows, cols);
game.buildSong();
game.start();
