function playSound(e) {
  const keyCode = (e.keyCode || Number(e.target.closest("[data-key]").getAttribute('data-key')));
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  if (!audio) return;

  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  key.classList.toggle('playing');
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key')

keys.forEach(key => {
  key.addEventListener('click', playSound);
  key.addEventListener('transitionend', removeTransition);
})

window.addEventListener('keydown', playSound);
