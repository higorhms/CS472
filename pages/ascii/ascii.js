(() => {
  "use strict";

  window.onload = () => {
    document.getElementById("start").onclick = start;
    document.getElementById("stop").onclick = stop;
    document.getElementById("animation").onchange = selectAnimation;
    document.getElementById("animation-size").onchange = changeAnimationSize;
    document.getElementById("turbo").onchange = turbo;
  }

  let text = null;
  let animationResource = null;
  let temp = null;
  let timer = null;
  let ANIMATION_INDEX = 0;
  const DEFAULT_SPEED = 250;
  
  const animate = (speed) => {
    text = document.getElementById("text-area");
    animationResource = ANIMATIONS[document.getElementById("animation").value];
    temp = animationResource.split("=====\n")

    if (timer !== null) return;
    
    timer = setInterval(()=> {
      if(ANIMATION_INDEX < temp.length){
        text.value = temp[ANIMATION_INDEX]
        ANIMATION_INDEX++;
      }
      if(ANIMATION_INDEX >= temp.length) ANIMATION_INDEX = 0;
    }, speed); 
  }

  const start = () => {
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
    document.getElementById("text-area").disabled = true;
    document.getElementById("animation").disabled = true;
    animate(DEFAULT_SPEED);
  }

  const stop = () => {
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("text-area").disabled = false;
    document.getElementById("animation").disabled = false;
    clearInterval(timer);
    timer = null;
  }

  const selectAnimation = () => {
    let textArea = document.getElementById("text-area");
    textArea.value = ANIMATIONS[document.getElementById("animation").value].split("=====\n")[0];
    ANIMATION_INDEX = 0;
  }    

  const changeAnimationSize = () => {
    let textSize = document.getElementById("animation-size").value;
    document.getElementById("text-area").style.fontSize = textSize;
  }

  const turbo = () => {
    if(document.getElementById("turbo").checked === true 
    && document.getElementById("start").disabled === true){
      clearInterval(timer);
      timer = null;
      animate(50);
    }else{
      if(document.getElementById("start").disabled === false){
        stop();
      }else{
        clearInterval(timer);
        timer = null;
        animate(DEFAULT_SPEED);
      }
    }
  }
})();