// Fetch media.json and populate sections
fetch("media.json")
  .then(res => res.json())
  .then(data => {
    loadMovies(data.movies || []);
    loadGames(data.games || []);
    initCarousels();
  });

// Load Movies
function loadMovies(movies) {
  const container = document.querySelector("#movies .carousel");
  container.innerHTML = ""; // clear first
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
  container.innerHTML = ""; // clear first
  games.forEach(game => {
    const item = document.createElement("a");
    item.href = "#";
    item.innerHTML = `<img src="${game.cover}" alt="${game.title}"><p>${game.title}</p>`;
    item.onclick = e => {
      e.preventDefault();
      alert("Game launch not implemented");
    };
    container.appendChild(item);
  });
}

// Video player functions
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

// Initialize carousels with center highlight and arrows
function initCarousels() {
  document.querySelectorAll(".carousel-container, .games-container").forEach(container => {
    const carousel = container.querySelector(".carousel") || container.querySelector("#games");
    const leftBtn = container.querySelector(".scroll-btn.left");
    const rightBtn = container.querySelector(".scroll-btn.right");

    // Scroll function
    function scroll(direction) {
      const scrollAmount = carousel.clientWidth * 0.8; // 80% width scroll
      if (direction === 1) {
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
      setTimeout(() => updateCenterHighlight(carousel), 300);
    }

    leftBtn.addEventListener("click", () => scroll(-1));
    rightBtn.addEventListener("click", () => scroll(1));

    // Center highlight
    function updateCenterHighlight(carousel) {
      const items = carousel.querySelectorAll(".movie-item, #games a");
      const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      items.forEach(item => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        item.classList.toggle("centered", Math.abs(carouselCenter - itemCenter) < item.offsetWidth / 2);
      });
    }

    // On scroll and resize
    carousel.addEventListener("scroll", () => updateCenterHighlight(carousel));
    window.addEventListener("resize", () => updateCenterHighlight(carousel));

    // Center first item on load
    const firstItem = carousel.querySelector(".movie-item, #games a");
    if (firstItem) {
      carousel.scrollLeft = firstItem.offsetLeft - (carousel.clientWidth - firstItem.offsetWidth)/2;
      updateCenterHighlight(carousel);
    }
  });
}
