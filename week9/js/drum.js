function play_sound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    if(!audio) return;//stop audio from playing if wrong key
    audio.currentTime = 0; //rewinds to the start
    audio.play();
    key.classList.add('playing');
    moveButton(key);
};

function removeTransition(e){
    if(e.propertyName !== 'transform') 
        return;
    this.classList.remove('playing');

}


const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', play_sound); 


function moveButton(key) {
    let computedStyle = window.getComputedStyle(key);
    computedStyle = Number(computedStyle.marginTop.match(/(\d+)/)[0]);
    if(computedStyle >= 110) {
       key.style.marginTop = `1rem`;
    }
    else {
        key.style.marginTop = `${computedStyle += 10}px`;
    }
 }

