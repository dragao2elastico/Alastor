const playButton = document.querySelector('.play-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const progressBar = document.querySelector('.progress');
const audioElement = document.querySelector('.audio');

let isPlaying = false;
let currentSong = 0;
const songs = [
    '../sounds/Come Along With Me.mp3',
    '../sounds/Suffering Siblings.mp3',
    '../sounds/Corruptro.mp3',
    '../sounds/Chiller.mp3',
    '../sounds/Cycles P-Sides.mp3'
];

playButton.addEventListener('click', () => {
    if (!isPlaying) {
        playButton.textContent = 'Pausar';
        isPlaying = true;
        audioElement.src = songs[currentSong];
        audioElement.play();
    } else {
        playButton.textContent = 'Tocar';
        isPlaying = false;
        audioElement.pause();
    }
});

prevButton.addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    audioElement.src = songs[currentSong];
    if (isPlaying) {
        audioElement.play();
    }
});

nextButton.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    audioElement.src = songs[currentSong];
    if (isPlaying) {
        audioElement.play();
    }
});
