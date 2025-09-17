// Minimal, working games loader
fetch("games.json")
  .then(res => res.json())
  .then(data => {
    const carousel = document.getElementById("games-carousel");
    if (!data.games) return;

    data.games.forEach(game => {
      const item = document.createElement("div");
      item.className = "game-item";
      item.innerHTML = `<img src="${game.cover}" alt="${game.title}"><p>${game.title}</p>`;
      item.onclick = () => window.location.href = game.url;
      carousel.appendChild(item);
    });

    initCarousel();
  })
  .catch(err => console.error("Failed to load games.json:", err));

// Carousel scroll buttons
function initCarousel() {
  document.querySelectorAll(".carousel-container").forEach(container => {
    const carousel = container.querySelector(".carousel");
    const leftBtn = container.querySelector(".scroll-btn.left");
    const rightBtn = container.querySelector(".scroll-btn.right");

    leftBtn.addEventListener("click", () => carousel.scrollBy({ left: -carousel.clientWidth * 0.7, behavior: "smooth" }));
    rightBtn.addEventListener("click", () => carousel.scrollBy({ left: carousel.clientWidth * 0.7, behavior: "smooth" }));
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
