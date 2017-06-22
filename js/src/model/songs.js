/*SONGS*/
class Song {
  constructor(notes) {
    this.notes = notes;
    this.tempo = new Array();
    this.positionArray = 0;

    for (let i = 0; i < notes.length; i++) {
      this.tempo[i] = 0;
    }
    this.convertSong();
  }


  convertSong() {
    let songConverted = this.notes.split("");
    songConverted.forEach(function(element, index) {
      switch (element) {
        case 'c':
          songConverted[index] = 0;
          break;
        case 'd':
          songConverted[index] = 1;
          break;
        case 'e':
          songConverted[index] = 2;

          break;
        case 'f':
          songConverted[index] = 3;

          break;
        case 'g':
          songConverted[index] = 4;

          break;
        case 'a':
          songConverted[index] = 5;

          break;
        case 'b':
          songConverted[index] = 6;

          break;
        case '2':
          songConverted[index] = 7;

          break;
        default:
      }
    });
    this.notes = songConverted;
    // return songConverted;
  }
}
// var happyBirthdaySheet2 = [
//   [{
//     note: 'g',
//     duration: '3',
//   }, ],
//   [{
//     note: 'g',
//     duration: '1',
//     },
//     {
//       note: 'a',
//       duration: '3',
//     },
//     {
//       note: 'g',
//       duration: '1',
//     },
//     {
//       note: 'Tomas',
//       duration: '3',
//     },
//     {
//       note: 'Tomas',
//       duration: 'Bechtelar',
//     }
//   ]
// ];

// let happyBirthdaySong = convertSong(happyBirthdaySheet);
// console.log(happyBirthdaySong);

// function convertSong(happyBirthdayNotes) {
//   let happyBirthdaySong = happyBirthdayNotes.split("");
//   happyBirthdaySong.forEach(function(element, index) {
//     switch (element) {
//       case 'c':
//         happyBirthdaySong[index] = 'a';
//         break;
//       case 'd':
//         happyBirthdaySong[index] = 's';
//         break;
//       case 'e':
//         happyBirthdaySong[index] = 'd';
//
//         break;
//       case 'f':
//         happyBirthdaySong[index] = 'f';
//
//         break;
//       case 'g':
//         happyBirthdaySong[index] = 'g';
//
//         break;
//       case 'a':
//         happyBirthdaySong[index] = 'h';
//
//         break;
//       case 'b':
//         happyBirthdaySong[index] = 'j';
//
//         break;
//       case '2':
//         happyBirthdaySong[index] = 'k';
//
//         break;
//       default:
//     }
//   });
//   return happyBirthdaySong;
// }
