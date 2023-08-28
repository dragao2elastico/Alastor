const video = document.getElementById('video');
const muteButton = document.getElementById('muteButton');
const pauseButton = document.getElementById('pauseButton');

muteButton.addEventListener('click', toggleMute);
pauseButton.addEventListener('click', togglePause);

function toggleMute() {
    video.muted = !video.muted;
    muteButton.textContent = video.muted ? 'Desmutar' : 'Mutar';
}

function togglePause() {
    if (video.paused) {
        video.play();
        pauseButton.textContent = 'Pausar';
    } else {
        video.pause();
        pauseButton.textContent = 'Continuar';
    }
}
