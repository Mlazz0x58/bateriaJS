const playingClass = 'playing';
crashRide = document.getElementById('crash-ride'),
hitHatTop = document.getElementById('hihat-top');

const animateCrashOrRide = () => {
    crashRide.style.transform = 'rotate(0deg) scale(1.5)';
};

const animateHiHatClosed = () => {
    hitHatTop.style.top = '175px';
};

const playSound = e => {
    const keyCode = e.keyCode;
    keyElement = document.querySelector(`div[data-key="${keyCode}"]`);
    if(!keyElement) return;

    const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
    audioElement.currentTime = 0;
    audioElement.play();

    switch(keyCode){
        case 69:
        case 82:
            animateCrashOrRide();
            break;
        case 75:
        case 73:
            animateHiHatClosed();
            break;
    }

    keyElement.classList.add(playingClass);
}

const removeCrashTransition = e => {
    if(e.propertyName !== 'transform') return;

    e.target.style.transform = 'rotate(-5.2deg) scale(1.2)';
}

const removeHiHatTopTransition = e => {
    if(e.propertyName !== 'top') return;

    e.target.style.top = '117px';
    //e.target.style.transform = '';    
}

const removeKeyTransition = e => {
    if(e.propertyName !== 'transform') return;

    e.target.classList.remove(playingClass);
}

const drumKeys = Array.from(document.querySelectorAll('.key'));
drumKeys.forEach(key => {
    key.addEventListener('transitionend', removeKeyTransition);
})

crashRide.addEventListener('transitionend', removeKeyTransition);
hitHatTop.addEventListener('transitionend', removeHiHatTopTransition);

window.addEventListener('keydown', playSound);