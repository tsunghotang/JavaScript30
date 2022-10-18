// https://stackoverflow.com/questions/43966150/bug-with-transitionend-event-not-correctly-removing-a-css-class

var keysUnderTransition = {
  "65": 0,
  "83": 0,
  "68": 0,
  "70": 0,
  "71": 0,
  "72": 0,
  "74": 0,
  "75": 0,
  "76": 0
};

	function playSound(e)
	{

    if (keysUnderTransition[e.keyCode]) {
      return;
    }
    keysUnderTransition[e.keyCode] = 2;

		const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
		const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
		if(!audio)
		{
			return;
		}
		if(key.classList.contains("playing"))
		{
			console.log("True");
			key.classList.remove("playing");
		}
		audio.currentTime = 0;
		audio.play();
		console.log("adding");
		key.classList.add("playing");
	}

	function removeTransition(e)
	{
		if(e.propertyName === "transform")
		{

      var dataKey = this.getAttribute('data-key');
      var underTransitionVal = keysUnderTransition[dataKey];
      if (underTransitionVal === 2) {
        setTimeout(function() {
          keysUnderTransition[dataKey] = 1;
        }, 50);
      } else if (underTransitionVal === 1) {
        keysUnderTransition[dataKey] = 0;
      }

			this.classList.remove("playing");
			if(this.classList.contains("playing"))
			{
				console.log("works");
				this.classList.remove("playing");
			}
			console.log(e);
		}
	}

	const keys = document.querySelectorAll('.key');
	keys.forEach(key => key.addEventListener('transitionend', removeTransition));
	window.addEventListener('keydown', playSound);
