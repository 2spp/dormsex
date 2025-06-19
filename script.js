const canvas = document.getElementById("rain-canvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const MAX_RAINDROPS = 120;

const raindrops = [];
const splashes = [];
const droplets = [];

function createGradient(length) {
  const grad = ctx.createLinearGradient(0, 0, 0, length);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
  grad.addColorStop(0.5, 'rgba(200, 200, 255, 0.3)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  return grad;
}

for (let i = 0; i < MAX_RAINDROPS; i++) {
  const length = Math.random() * 15 + 15;
  raindrops.push({
    x: Math.random() * width,
    y: Math.random() * height,
    speed: Math.random() * 4 + 7,
    length: length,
    opacity: Math.random() * 0.4 + 0.3,
    angle: (Math.random() * 8 - 4) * Math.PI / 180,
    gradient: createGradient(length),
  });
}

function createSplat(x, y) {
  for (let i = 0; i < 5; i++) {
    splashes.push({
      x,
      y,
      dx: (Math.random() - 0.5) * 2,
      dy: -Math.random() * 1.5,
      r: Math.random() * 1 + 0.5,
      opacity: 1,
      fade: Math.random() * 0.04 + 0.02,
    });
  }
  droplets.push({
    x,
    y,
    r: Math.random() * 1.3 + 0.7,
    opacity: 1,
    fade: Math.random() * 0.015 + 0.008,
  });
}

function drawRain() {
  ctx.clearRect(0, 0, width, height);

  for (let drop of raindrops) {
    ctx.save();
    ctx.translate(drop.x, drop.y);
    ctx.rotate(drop.angle);
    ctx.strokeStyle = drop.gradient;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, drop.length);
    ctx.stroke();
    ctx.restore();

    drop.y += drop.speed;
    if (drop.y > height) {
      drop.y = -drop.length;
      drop.x = Math.random() * width;
      createSplat(drop.x, height - 2);
    }
  }

  for (let i = splashes.length - 1; i >= 0; i--) {
    const s = splashes[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    s.opacity -= s.fade;
    if (s.opacity <= 0) splashes.splice(i, 1);
  }

  for (let i = droplets.length - 1; i >= 0; i--) {
    const d = droplets[i];
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${d.opacity})`;
    ctx.fill();
    d.opacity -= d.fade;
    if (d.opacity <= 0) droplets.splice(i, 1);
  }

  requestAnimationFrame(drawRain);
}

drawRain();

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// MUSIC PLAYER
const songs = [
  { title: "Thrife Som oss", src: "music/song1.mp3" },
  { title: "G1ocatore Tvåsexti", src: "music/song2.mp3" },
  { title: "Pekenio Kallt", src: "music/song3.mp3" },
];

let currentSong = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("song-title");

function loadSong(index) {
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  audio.play();
  playBtn.innerHTML = "❚❚";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = "❚❚";
  } else {
    audio.pause();
    playBtn.innerHTML = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

loadSong(currentSong);
