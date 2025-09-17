// Helper: Convert Google Drive file ID to direct link
function getDriveDirectLink(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

// Load movies from media.json
fetch("media.json")
  .then(res => res.json())
  .then(data => {
    const movies = data.movies || [];
    const carousel = document.querySelector("#movies .carousel");
    movies.forEach(movie => {
      const item = document.createElement("div");
      item.className = "movie-item";
      item.innerHTML = `<img src="${movie.cover}" alt="${movie.title}"><p>${movie.title}</p>`;
      item.onclick = () => playVideo(getDriveDirectLink(movie.file));
      carousel.appendChild(item);
    });
    initCarousel();
  });

// Video player functions
function playVideo(src) {
  const player = document.getElementById("player");
  const video = document.getElementById("video");
  video.src = src;
  video.load();
  video.onerror = () => {
    alert("Failed to load video. Google Drive may block streaming for large files.");
  };
  player.style.display = "flex";
  video.play().catch(err => console.warn(err));
}

function closePlayer() {
  const player = document.getElementById("player");
  const video = document.getElementById("video");
  video.pause();
  video.src = "";
  player.style.display = "none";
}

// Initialize carousel scroll buttons
function initCarousel() {
  document.querySelectorAll(".carousel-container").forEach(container => {
    const carousel = container.querySelector(".carousel");
    const leftBtn = container.querySelector(".scroll-btn.left");
    const rightBtn = container.querySelector(".scroll-btn.right");

    leftBtn.addEventListener("click", () => carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: "smooth" }));
    rightBtn.addEventListener("click", () => carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: "smooth" }));

    // Center first item on load
    const first = carousel.querySelector(".movie-item");
    if (first) {
      carousel.scrollLeft = first.offsetLeft - (carousel.clientWidth - first.offsetWidth)/2;
      updateCenter(carousel);
    }

    carousel.addEventListener("scroll", () => updateCenter(carousel));
    window.addEventListener("resize", () => updateCenter(carousel));
  });
}

// Highlight center item
function updateCenter(carousel) {
  const items = carousel.querySelectorAll(".movie-item");
  const center = carousel.scrollLeft + carousel.clientWidth / 2;
  items.forEach(item => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    item.classList.toggle("centered", Math.abs(center - itemCenter) < item.offsetWidth / 2);
  });
}
