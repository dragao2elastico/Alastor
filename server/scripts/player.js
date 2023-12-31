const playButton = document.querySelector('.play-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const progressBar = document.querySelector('.progress');
const volumeSlider = document.querySelector('.volume-slider');
const audioElement = document.querySelector('.audio');
const titleElement = document.querySelector('.music-title');
const thumbElement = document.querySelector('.music-thumb img');

let isPlaying = false;
let currentSong = 0;

const songs = [
    {
        file: '../sounds/Come-Along-With-Me.mp3',
        thumb: '../imgs/Come-Along-With-Me.jpg',
        title: 'Come Along With Me'
    },
    {
        file: '../sounds/Suffering-Siblings.mp3',
        thumb: '../imgs/Suffering-Siblings.jpg',
        title: 'Suffering Siblings'
    },
    {
        file: '../sounds/Corruptro.mp3',
        thumb: '../imgs/Corruptro.jpg',
        title: 'Corruptro'
    },
    {
        file: '../sounds/Chiller.mp3',
        thumb: '../imgs/Chiller.jpg',
        title: 'Chiller'
    },
    {
        file: '../sounds/Cycles-P-Sides.mp3',
        thumb: '../imgs/Cycles-P-Sides.jpg',
        title: 'Cycles P-Sides'
    }
];

playButton.addEventListener('click', () => {
    if (!isPlaying) {
        playButton.textContent = 'Pausar';
        isPlaying = true;
        audioElement.src = songs[currentSong].file;
        audioElement.play();
        updateMusicInfo(currentSong);
    } else {
        playButton.textContent = 'Tocar';
        isPlaying = false;
        audioElement.pause();
    }
});

prevButton.addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    updateAudioAndPlay();
    updateMusicInfo(currentSong);
});

nextButton.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    updateAudioAndPlay();
    updateMusicInfo(currentSong);
});

audioElement.addEventListener('timeupdate', () => {
    const progressPercentage = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
});

volumeSlider.addEventListener('input', () => {
    const volumeValue = volumeSlider.value;
    audioElement.volume = volumeValue / 100;
});

function updateAudioAndPlay() {
    audioElement.src = songs[currentSong].file;
    if (isPlaying) {
        audioElement.play();
    }
}

function updateMusicInfo(songIndex) {
    const song = songs[songIndex];
    titleElement.textContent = song.title;
    thumbElement.src = song.thumb;
}
