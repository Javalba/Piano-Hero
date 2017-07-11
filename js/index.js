let buttonStart = document.getElementsByClassName('start')[0];

buttonStart.addEventListener("click", function (){
  let indexSong = document.getElementById("mySelect").selectedIndex;
  let inputText = document.getElementById('myCreate').value;
  if(inputText){
    window.location.href  = `views/main.html?song=z=${inputText}`;
  }else{
    window.location.href = `views/main.html?song=${indexSong}`;
  }
});
