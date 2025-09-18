// Load apps from apps.json
fetch("apps.json")
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

      // Render apps
      data[sectionName].forEach(app => {
        const item = document.createElement("div");
        item.className = "game-item";

        if (app.visible) {
          item.innerHTML = `<img src="${app.cover}" alt="${app.title}"><p>${app.title}</p>`;
          item.addEventListener("click", () => openAppIframe(app));
        } else {
          item.innerHTML = `<div class="placeholder"></div>`;
        }

        carousel.appendChild(item);
      });

      carouselContainer.appendChild(carousel);

      // LEFT SCROLL BUTTON
      const leftBtn = document.createElement("button");
      leftBtn.className = "scroll-btn left";
      leftBtn.innerHTML = "&#10094;";
      leftBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -carousel.clientWidth * 0.7, behavior: "smooth" });
      });
      carouselContainer.appendChild(leftBtn);

      // RIGHT SCROLL BUTTON
      const rightBtn = document.createElement("button");
      rightBtn.className = "scroll-btn right";
      rightBtn.innerHTML = "&#10095;";
      rightBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: carousel.clientWidth * 0.7, behavior: "smooth" });
      });
      carouselContainer.appendChild(rightBtn);

      sectionDiv.appendChild(carouselContainer);
      container.appendChild(sectionDiv);
    }

    initSearch();
  })
  .catch(err => console.error("Failed to load apps.json:", err));

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

// Open app in iframe overlay (same style as games)
function openAppIframe(app) {
  const overlay = document.createElement("div");
  overlay.className = "iframe-overlay";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", () => document.body.removeChild(overlay));
  overlay.appendChild(closeBtn);

  const iframe = document.createElement("iframe");
  iframe.src = app.url;
  overlay.appendChild(iframe);

  document.body.appendChild(overlay);
}