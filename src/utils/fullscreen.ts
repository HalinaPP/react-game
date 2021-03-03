// @ts-nocheck
document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen;

export const enterFullscreen = (id) => {
  const el = document.getElementById(id);
  const modalWindow = document.getElementById('modalWindow');
  modalWindow?.style.display = 'none';

  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  }
}

const exitFullscreen = id => {
  const modalWindow = document.getElementById('modalWindow');
  modalWindow?.style.display = "block";

  document.cancelFullScreen();
  document.querySelector(`#${id} button`).onclick = function () {
    enterFullscreen(id);
  };
};


