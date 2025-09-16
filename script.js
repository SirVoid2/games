// GAME SEARCH
const input = document.querySelector('.search input');
const games = document.querySelectorAll('#games img');
input.addEventListener('input', () => {
  const searchTerm = input.value.toLowerCase();
  games.forEach(game => {
    game.style.display = game.alt.toLowerCase().includes(searchTerm) ? 'block' : 'none';
  });
});

// MEDIA HUB
import { createFFmpeg, fetchFile } from "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.6/dist/ffmpeg.min.js";

const ffmpeg = createFFmpeg({ log: true });
const video = document.getElementById("video");
const player = document.getElementById("player");

async function loadMedia() {
  const res = await fetch("media.json");
  const data = await res.json();

  data.movies.forEach(m => addCard("movies", m.title, m.cover, () => playMedia(m.file)));
  data.shows.forEach(s => addCard("shows", s.title, s.cover, () => playMedia(s.episodes[0].file)));
  data.games.forEach(g => addCard("mediagames", g.title, g.cover, () => window.open(g.file, "_blank")));
}

function addCard(sectionId, title, cover, onClick) {
  const section = document.getElementById(sectionId);
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${cover}" alt="${title}">`;
  card.onclick = onClick;
  section.appendChild(card);
}

async function playMedia(filePath) {
  if (filePath.endsWith(".mp4")) {
    openPlayer(filePath);
  } else if (filePath.endsWith(".mkv")) {
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "input.mkv", await fetchFile(filePath));
    await ffmpeg.run("-i", "input.mkv", "-c:v", "libx264", "-c:a", "aac", "output.mp4");
    const data = ffmpeg.FS("readFile", "output.mp4");
    const blob = new Blob([data.buffer], { type: "video/mp4" });
    openPlayer(URL.createObjectURL(blob));
  } else {
    alert("Unsupported file type: " + filePath);
  }
}

function openPlayer(src) {
  video.src = src;
  player.style.display = "flex";
  video.play();
}
function closePlayer() {
  player.style.display = "none";
  video.pause();
  video.src = "";
}

loadMedia();
