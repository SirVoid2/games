// Load games from games.json
fetch("games.json")
  .then(res => res.json())
  .then(data => {
    const games = data.games || [];
    const carousel = document.getElementById("games-carousel");
    games.forEach(game => {
      const item = document.createElement("div");
      item.className = "game-item";
      item.innerHTML = `<img src="${game.cover}" alt="${game.title}"><p>${game.title}</p>`;
      item.onclick = () => window.location.href = game.url;
      carousel.appendChild(item);
    });
    initCarousel();
  });

// Initialize carousel scroll buttons
function initCarousel() {
  document.querySelectorAll(".carousel-container").forEach(container => {
    const carousel = container.querySelector(".carousel");
    const leftBtn = container.querySelector(".scroll-btn.left");
    const rightBtn = container.querySelector(".scroll-btn.right");

    leftBtn.addEventListener("click", () => carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: "smooth" }));
    rightBtn.addEventListener("click", () => carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: "smooth" }));

    // Center first item on load
    const first = carousel.querySelector(".game-item");
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
  const items = carousel.querySelectorAll(".game-item");
  const center = carousel.scrollLeft + carousel.clientWidth / 2;
  items.forEach(item => {
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    item.classList.toggle("centered", Math.abs(center - itemCenter) < item.offsetWidth / 2);
  });
}

// Search filter
const input = document.querySelector(".search input");
input.addEventListener("input", () => {
  const term = input.value.toLowerCase();
  document.querySelectorAll(".game-item").forEach(item => {
    const title = item.querySelector("p").textContent.toLowerCase();
    item.style.display = title.includes(term) ? "block" : "none";
  });
});
