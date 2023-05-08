const textArea = document.getElementById("text-area");

let biggerDecorationToogle = false;
const increaseText = () =>{
  textArea.style.fontSize = `${parseInt(textArea.style.fontSize || 12) + 2}pt`;
}
let interval;
const biggerDirectionsButton = () => {
  biggerDecorationToogle = !biggerDecorationToogle;
  if(biggerDecorationToogle){
    interval = setInterval(increaseText, 500);
  }else{
    clearInterval(interval);
  }
}


let blingToggle = false;
const applyBling = () => {
  blingToggle = !blingToggle;

  textArea.style.fontWeight = "normal";
  textArea.style.textDecoration = "none";
  textArea.style.color = "black";
  document.getElementById("container").classList.remove("background-dollar");

  if(blingToggle){
    alert("Bling!")
    document.getElementById("container").classList.add("background-dollar");
    textArea.style.fontWeight = "bold";
    textArea.style.textDecoration = "underline";
    textArea.style.color = "green";
  }
}