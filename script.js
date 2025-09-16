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

    // Movies
    const moviesSection = document.querySelector("#movies .carousel");
    data.movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${movie.cover}" alt="${movie.title}">`;
      card.addEventListener("click", () => openPlayer(movie.file));
      moviesSection.appendChild(card);
    });

    // Shows
    const showsSection = document.querySelector("#shows .carousel");
    data.shows.forEach(show => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${show.cover}" alt="${show.title}">`;
      card.addEventListener("click", () => openPlayer(show.episodes[0].file));
      showsSection.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading media:", err);
  }
}

// INIT
loadMedia();
