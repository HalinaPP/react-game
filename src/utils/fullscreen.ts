 // @ts-nocheck
document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen;

const exitFullscreen = (id) => {
  document.cancelFullScreen();
  document.querySelector(`#${id} button`).onclick = function(){
    enterFullscreen(id);
  }
}

export function enterFullscreen(id) {
  const el =  document.getElementById(id);
  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  } 
  document.querySelector(`#${id} button`).onclick = function(){
    exitFullscreen(id);
  }
}

