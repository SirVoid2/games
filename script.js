// Load media.json
fetch("media.json")
  .then(res => res.json())
  .then(data => {
    loadMovies(data.movies);
  });

// Load Movies
function loadMovies(movies) {
  const container = document.getElementById("movie-carousel");
  movies.forEach(movie => {
    const item = document.createElement("div");
    item.className = "movie-item";
    item.innerHTML = `
      <img src="${movie.cover}" alt="${movie.title}" />
      <p>${movie.title}</p>
    `;
    item.onclick = () => playVideo(movie.file);
    container.appendChild(item);
  });
}

// Play video
function playVideo(src) {
  const player = document.getElementById("player");
  const video = document.getElementById("video");

  video.src = src;
  player.style.display = "block";
  video.play();
}

// Close player
function closePlayer() {
  const player = document.getElementById("player");
  const video = document.getElementById("video");

  video.pause();
  video.src = "";
  player.style.display = "none";
}
