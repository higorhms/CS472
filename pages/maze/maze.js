var isOverBound = false;
var isCheating = false;
let isGameStarted = false;

$(()=>{
  const boundaryElements = $(".boundary");
  const endElement = $("#end");
  const startElement = $("#start");
  const mazeBlock = $("#maze");
  const status = $("#status");

  const start = () => {
    isOverBound = false;
    isCheating = false;
    isGameStarted = true;

    boundaryElements.removeClass("lost");
    boundaryElements.removeClass("win");
    status.text('Move the cursor to the "E" without touching any walls to win.');
  }

  const lost = () => {
    boundaryElements.addClass("lost");
    status.text("You Lost! Try harder next time.");
    alert("You Lost! Try harder next time.");
  }

  const win = () => {
    boundaryElements.addClass("win");
    status.text('You Win! Congratulations!');
    alert("You win! Congratulations!");
  }

  const overBound = () => {
    if(!isGameStarted) return;
    isOverBound = true;
    end();
  }

  const antiCheatEnging = () => {
    isCheating = true;
    end();
  }

  const end = () => {
    if(!isGameStarted) return;
    isGameStarted = false;
    if(isOverBound || isCheating) return lost();
    win();
  }


  (function addListeners(){
    boundaryElements.mouseover(overBound);
    endElement.mouseover(end);
    startElement.click(start);
    mazeBlock.mouseleave(antiCheatEnging);
  })();
})