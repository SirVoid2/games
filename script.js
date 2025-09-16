import { createFFmpeg, fetchFile } from "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.6/dist/ffmpeg.min.js";

const ffmpeg = createFFmpeg({ log: true });

// SEARCH FUNCTIONALITY
const input = document.querySelector('.search input');
const games = document.querySelectorAll('#games img');
input.addEventListener('input', () => {
  const searchTerm = input.value.toLowerCase();
  games.forEach(game => {
    game.style.display = game.alt.toLowerCase().includes(searchTerm) ? 'block' : 'none';
  });
});

// VIDEO PLAYER
const video = document.getElementById("video");
const player = document.getElementById("player");

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

// MEDIA HUB
async function loadMedia() {
  try {
    const res = await fetch("media.json");
    if (!res.ok) throw new Error("Cannot fetch media.json");
    const data = await res.json();

    // Load Movies
    const moviesSection = document.querySelector("#movies .carousel");
    for (let movie of data.movies) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${movie.cover}" alt="${movie.title}">`;
      card.addEventListener("click", () => playMedia(movie.file));
      moviesSection.appendChild(card);
    }

    // Load Shows
    const showsSection = document.querySelector("#shows .carousel");
    for (let show of data.shows) {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${show.cover}" alt="${show.title}">`;
      card.addEventListener("click", () => playMedia(show.episodes[0].file));
      showsSection.appendChild(card);
    }

  } catch (err) {
    console.error("Error loading media:", err);
  }
}

// PLAY MEDIA WITH MKV CONVERSION
async function playMedia(filePath) {
  if (filePath.endsWith(".mp4")) {
    openPlayer(filePath);
  } else if (filePath.endsWith(".mkv")) {
    if (!ffmpeg.isLoaded()) await ffmpeg.load();

    // fetch file and write to ffmpeg FS
    const fileData = await fetchFile(filePath);
    ffmpeg.FS("writeFile", "input.mkv", fileData);

    // run ffmpeg conversion
    await ffmpeg.run("-i", "input.mkv", "-c:v", "libx264", "-c:a", "aac", "output.mp4");

    // read output and create blob URL
    const data = ffmpeg.FS("readFile", "output.mp4");
    const blob = new Blob([data.buffer], { type: "video/mp4" });
    openPlayer(URL.createObjectURL(blob));
  } else {
    alert("Unsupported file type: " + filePath);
  }
}

// INIT
loadMedia();
