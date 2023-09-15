const diskCover = document.querySelector(".disk-cover");

const music = document.querySelector(".audio");

const musicName = document.querySelector(".music-name");

const bandName = document.querySelector(".band-name");

const play = document.getElementById("play");

const previous = document.getElementById("previous");

const next = document.getElementById("next");

const currentProgress = document.querySelector(".current-progress-bar");

const currentTime = document.querySelector(".current-time");

const durationTime = document.querySelector(".duration");

const progressBar = document.querySelector(".progress-bar");

let isPlaying = false;
let current_music_index;

let musics = [
    {
        title: "1 Deuces",
        artist: "Chris Brown Ft. Tyga And Kevin McCall",
        music_path: "./assets/Músicas/01 Deuces (Ft. Tyga And Kevin McCall.m4a",
        img_path: "./assets/hans-eiskonen-8Pm_A-OHJGg-unsplash.png"
    },

    {
        title: "2 Up To You",
        artist: "Chris Brown",
        music_path: "./assets/Músicas/02 Up To You.m4a",
        img_path: "./assets/hans-eiskonen-8Pm_A-OHJGg-unsplash.png"
    },

    {
        title: "3 No BS",
        artist: "Chris Brown Ft. Kevin McCall",
        music_path: "./assets/Músicas/03 No BS (Ft. Kevin McCall).m4a",
        img_path: "./assets/hans-eiskonen-8Pm_A-OHJGg-unsplash.png"
    }
]

initPayer();

function initPayer() {
    current_music_index = 0;
    updatePlayer();
}

function updatePlayer() {
    let musicList = musics[current_music_index];
    diskCover.src = musicList.img_path;
    music.src = musicList.music_path;
    musicName.innerText = musicList.title;
    bandName.innerText = musicList.artist;   
}

function playPauseDecider() {
    if (music.paused) {
        music.play();
        play.querySelector(".bi-pause-btn").classList.toggle("hide")
        play.querySelector(".bi-play-btn").classList.toggle("hide")
        isPlaying = true
    }
    else {
        music.pause();
        play.querySelector(".bi-play-btn").classList.toggle("hide")
        play.querySelector(".bi-pause-btn").classList.toggle("hide")
        isPlaying = false
    }
}

function changemusic(next = true) {
    if (next) {
        current_music_index++;
        if (current_music_index > musics.length - 1) {
            current_music_index = 0;
        }
    }
    else {
        current_music_index--;
        if (current_music_index < 0) {
            current_music_index = musics.length - 1
        }
    }

    updatePlayer();
    if (isPlaying) music.play();
}

function updateProgressBar() {
    if (!music.duration) return;

    const barWidth = (music.currentTime / music.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);

    const currentMin = Math.floor(music.currentTime / 60)
    const currentSecond = Math.floor(((music.currentTime / 60) % 1) * 60)
    currentTime.innerText = `${formatMusicTime(currentMin)} : ${formatMusicTime(currentSecond)}`;

    const durationMin = Math.floor(music.duration / 60)
    const durationSecond = Math.floor(((music.duration / 60) % 1) * 60)
    durationTime.innerText = `${formatMusicTime(durationMin)} : ${formatMusicTime(durationSecond)}`;
    
    if (music.ended ){
        changemusic();
    }
}
function skipTime(event) {
    const width = progressBar.clientWidth;
    const clickPosition = event.offsetX;
    const jumpTime = (clickPosition / width) * music.duration;
    music.currentTime = jumpTime;
}

function formatMusicTime(num) {
    return (num >= 10 ? num : `0${num}`)
}

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', () => changemusic(false))
next.addEventListener('click', () => changemusic());
music.addEventListener('timeupdate', updateProgressBar)
progressBar.addEventListener("click", skipTime)



