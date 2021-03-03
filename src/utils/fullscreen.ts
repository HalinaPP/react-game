// @ts-nocheck
document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen;

export const enterFullscreen = id => {
  const el = document.getElementById(id);
 
  if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  }
};



const exitFullscreen = id => {
  const modalWindow = document.getElementById('modalWindow');
  modalWindow?.style.display = 'block';

  document.cancelFullScreen();
  document.querySelector(`#${id} button`).onclick = function () {
    enterFullscreen(id);
  };
};



document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      const modalWindow = document.getElementById('modalWindow');
      modalWindow?.classList.remove('show');
      modalWindow?.classList.remove('modal-dialog-centered');
      
      
    }
}  