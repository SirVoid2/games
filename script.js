// Load media.json
fetch("media.json")
  .then(res => res.json())
  .then(data => {
    loadMovies(data.movies);
    loadGames(data.games);
  });

// Load Movies
function loadMovies(movies) {
  const container = document.querySelector("#movies .carousel");
  movies.forEach(movie => {
    const item = document.createElement("div");
    item.className = "movie-item";
    item.innerHTML = `<img src="${movie.cover}" alt="${movie.title}"><p>${movie.title}</p>`;
    item.onclick = () => playVideo(movie.file);
    container.appendChild(item);
  });
}

// Load Games
function loadGames(games) {
  const container = document.getElementById("games");
  games.forEach(game => {
    const item = document.createElement("a");
    item.href = "#";
    item.innerHTML = `<img src="${game.cover}" alt="${game.title}"><p>${game.title}</p>`;
    item.onclick = () => alert("Game launch not implemented"); 
    container.appendChild(item);
  });
}

// Video Player
function playVideo(src) {
  const player = document.getElementById("player");
  const video = document.getElementById("video");
  video.src = src;
  player.style.display = "flex";
  video.play();
}

function closePlayer() {
  const player = document.getElementById("player");
  const video = document.getElementById("video");
  video.pause();
  video.src = "";
  player.style.display = "none";
}

// Infinite scroll + center highlight
function initCarousels() {
  document.querySelectorAll(".carousel-container, .games-container").forEach(container => {
    const carousel = container.querySelector(".carousel") || container.querySelector("#games");
    const leftBtn = container.querySelector(".scroll-btn.left");
    const rightBtn = container.querySelector(".scroll-btn.right");

    function scroll(direction) {
      const scrollAmount = carousel.clientWidth * 0.9;
      if (direction === 1) {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      } else {
        if (carousel.scrollLeft <= 10) {
          carousel.scrollTo({ left: carousel.scrollWidth - carousel.clientWidth, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      }
      setTimeout(() => updateCenterHighlight(carousel), 400);
    }

    leftBtn.addEventListener("click", () => scroll(-1));
    rightBtn.addEventListener("click", () => scroll(1));

    function updateCenterHighlight(carousel) {
      const items = carousel.querySelectorAll(".movie-item, #games a");
      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      items.forEach(item => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        item.classList.toggle("centered", Math.abs(carouselCenter - itemCenter) < item.offsetWidth / 2);
      });
    }

    carousel.addEventListener("scroll", () => updateCenterHighlight(carousel));
    window.addEventListener("resize", () => updateCenterHighlight(carousel));
    updateCenterHighlight(carousel);
  });
}

document.addEventListener("DOMContentLoaded", initCarousels);
