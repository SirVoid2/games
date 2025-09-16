import { createFFmpeg, fetchFile } from "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.6/dist/ffmpeg.min.js";

const ffmpeg = createFFmpeg({ log: true });
const video = document.getElementById("video");
const player = document.getElementById("player");

function openPlayer(src) {
  console.log("openPlayer:", src);
  video.src = src;
  player.style.display = "flex";
  video.play().catch(e => console.error("play error:", e));
}

function closePlayer() {
  player.style.display = "none";
  video.pause();
  video.src = "";
}

async function loadMedia() {
  console.log("loadMedia called");
  const res = await fetch("media.json");
  console.log("fetch media.json status:", res.status);
  if (!res.ok) {
    console.error("Could not load media.json");
    return;
  }
  const data = await res.json();
  console.log("media.json data:", data);

  const moviesSection = document.querySelector("#movies .carousel");
  if (!moviesSection) {
    console.error("Movies carousel element missing");
  } else {
    data.movies.forEach(movie => {
      console.log("Adding movie:", movie.title);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${movie.cover}" alt="${movie.title}">`;
      card.onclick = () => openPlayer(movie.file);
      moviesSection.appendChild(card);
    });
  }

  const showsSection = document.querySelector("#shows .carousel");
  if (!showsSection) {
    console.error("Shows carousel element missing");
  } else {
    data.shows.forEach(show => {
      console.log("Adding show:", show.title);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${show.cover}" alt="${show.title}">`;
      card.onclick = () => openPlayer(show.episodes[0].file);
      showsSection.appendChild(card);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadMedia();
});
