// ---- SCRIPT.JS ----

// Helper: create iframe overlay
function createIframeOverlay(url) {
  // Remove existing overlay if any
  const existing = document.querySelector(".iframe-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "iframe-overlay";

  const iframe = document.createElement("iframe");
  iframe.src = url;

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "×";
  closeBtn.onclick = () => overlay.remove();

  overlay.appendChild(closeBtn);
  overlay.appendChild(iframe);
  document.body.appendChild(overlay);
}

// Load JSON (apps or games)
function loadJSON(jsonPath) {
  fetch(jsonPath)
    .then(res => res.json())
    .then(data => renderSections(data))
    .catch(err => console.error(`Failed to load ${jsonPath}:`, err));
}

// Render sections
function renderSections(data) {
  const container = document.getElementById("game-sections");
  container.innerHTML = ""; // Clear existing

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

    data[sectionName].forEach(item => {
      const div = document.createElement("div");
      div.className = "game-item";

      if (item.visible) {
        div.innerHTML = `<img src="${item.cover}" alt="${item.title}"><p>${item.title}</p>`;
        div.onclick = () => createIframeOverlay(item.url);
      } else {
        div.innerHTML = `<div class="placeholder"></div>`;
      }

      carousel.appendChild(div);
    });

    carouselContainer.appendChild(carousel);

    // Scroll buttons
    const leftBtn = document.createElement("button");
    leftBtn.className = "scroll-btn left";
    leftBtn.innerHTML = "&#10094;";
    leftBtn.onclick = () => carousel.scrollBy({ left: -carousel.clientWidth * 0.7, behavior: "smooth" });
    carouselContainer.appendChild(leftBtn);

    const rightBtn = document.createElement("button");
    rightBtn.className = "scroll-btn right";
    rightBtn.innerHTML = "&#10095;";
    rightBtn.onclick = () => carousel.scrollBy({ left: carousel.clientWidth * 0.7, behavior: "smooth" });
    carouselContainer.appendChild(rightBtn);

    sectionDiv.appendChild(carouselContainer);
    container.appendChild(sectionDiv);
  }

  initSearch();
}

// Search filter
function initSearch() {
  const input = document.querySelector(".search input");
  input.addEventListener("input", () => {
    const term = input.value.toLowerCase();
    document.querySelectorAll(".game-item").forEach(item => {
      const titleEl = item.querySelector("p");
      const title = titleEl ? titleEl.textContent.toLowerCase() : "";
      item.style.display = title === "" ? "flex" : title.includes(term) ? "flex" : "none";
    });
  });
}

// ---- INIT ----
// Choose which JSON to load: apps or games
// Example: "apps/apps.json" or "games/games.json"
const currentPage = window.location.pathname.includes("/apps/") ? "apps/apps.json" : "games/games.json";
loadJSON(currentPage);
