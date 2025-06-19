
const songs = [...Array(12).keys()].map(i => ({
  title: `Track ${i+1}`,
  artist: "Dorm",
  src: `music/song${i+1}.mp3`,
  album: `img/album${i+1}.jpg`
}));

let currentSong = 0;
let isShuffle = false;
let isRepeat = false;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const albumArt = document.getElementById("album-art");
const volumeBtn = document.getElementById("volume-btn");
const volumeIcon = document.getElementById("volume-icon");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  albumArt.src = song.album;
  audio.play();
  playBtn.querySelector("img").src = "icons/pause.svg";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.querySelector("img").src = "icons/pause.svg";
  } else {
    audio.pause();
    playBtn.querySelector("img").src = "icons/play.svg";
  }
});

nextBtn.addEventListener("click", () => {
  currentSong = isShuffle ? Math.floor(Math.random() * songs.length) : (currentSong + 1) % songs.length;
  loadSong(currentSong);
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
});

audio.addEventListener("ended", () => {
  isRepeat ? loadSong(currentSong) : nextBtn.click();
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
});

volumeBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  volumeIcon.src = audio.muted ? "icons/volume-x.svg" : "icons/volume.svg";
});

loadSong(currentSong);
