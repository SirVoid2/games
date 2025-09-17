// Load games from JSON
fetch("games.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("game-sections");

    for (const sectionName in data) {
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "row";

      // Section title
      const h2 = document.createElement("h2");
      h2.textContent = sectionName;
      sectionDiv.appendChild(h2);

      // Carousel container
      const carouselContainer = document.createElement("div");
      carouselContainer.className = "carousel-container";

      const carousel = document.createElement("div");
      carousel.className = "carousel";

      // Render games
      data[sectionName].forEach(game => {
        const item = document.createElement("div");
        item.className = "game-item";

        if (game.visible) {
          item.innerHTML = `<img src="${game.cover}" alt="${game.title}"><p>${game.title}</p>`;
          item.onclick = () => window.location.href = game.url;
        } else {
          // Placeholder element, invisible but still occupies space
          item.innerHTML = `<div class="placeholder"></div>`;
        }

        carousel.appendChild(item);
      });

      carouselContainer.appendChild(carousel);

      // Scroll buttons
      const leftBtn = document.createElement("button");
      leftBtn.className = "scroll-btn left";
      leftBtn.innerHTML = "&#10094;";
      carouselContainer.appendChild(leftBtn);

      const rightBtn = document.createElement("button");
      rightBtn.className = "scroll-btn right";
      rightBtn.innerHTML = "&#10095;";
      carouselContainer.appendChild(rightBtn);

      sectionDiv.appendChild(carouselContainer);
      container.appendChild(sectionDiv);

      // Scroll functionality
      leftBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -carousel.clientWidth * 0.7, behavior: "smooth" });
      });

      rightBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: carousel.clientWidth * 0.7, behavior: "smooth" });
      });

      // Center highlight effect
      function highlightCenter() {
        const items = carousel.querySelectorAll(".game-item");
        const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
        items.forEach(item => item.classList.remove("centered"));

        let closest = null;
        let closestDistance = Infinity;
        items.forEach(item => {
          const itemCenter = item.offsetLeft + item.offsetWidth / 2;
          const distance = Math.abs(carouselCenter - itemCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = item;
          }
        });
        if (closest) closest.classList.add("centered");
      }

      carousel.addEventListener("scroll", highlightCenter);
      highlightCenter(); // initial highlight
    }

    initSearch();
  })
  .catch(err => console.error("Failed to load games.json:", err));

// Search filter for all sections
function initSearch() {
  const input = document.querySelector(".search input");
  input.addEventListener("input", () => {
    const term = input.value.toLowerCase();
    document.querySelectorAll(".game-item").forEach(item => {
      const titleEl = item.querySelector("p");
      const title = titleEl ? titleEl.textContent.toLowerCase() : "";
      // Only visible items are filtered
      if (title === "") {
        item.style.display = "flex"; // keep placeholder in layout
      } else {
        item.style.display = title.includes(term) ? "flex" : "none";
      }
    });
  });
}
