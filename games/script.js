// ---- COMBINED SCRIPT.JS ----

// Helper: create iframe overlay for apps
function openAppIframe(app) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "rgba(0,0,0,0.9)";
  overlay.style.zIndex = 9999;
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "20px";
  closeBtn.style.right = "30px";
  closeBtn.style.fontSize = "40px";
  closeBtn.style.color = "#fff";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.cursor = "pointer";
  closeBtn.addEventListener("click", () => document.body.removeChild(overlay));
  overlay.appendChild(closeBtn);

  const iframe = document.createElement("iframe");
  iframe.src = app.url;
  iframe.style.width = "90%";
  iframe.style.height = "90%";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";
  overlay.appendChild(iframe);

  document.body.appendChild(overlay);
}

// Generic function to render sections
function renderSections(data, type = "game") {
  const container = document.getElementById("game-sections");

  for (const sectionName in data) {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "row";

    const h2 = document.createElement("h2");
    h2.textContent = sectionName;
    sectionDiv.appendChild(h2);

    const carouselContainer = document.createElement("div");
    carouselContainer.className = "carousel-container";

    const carousel = document.createElement("div");
    carousel.className = "carousel";

    data[sectionName].forEach(item => {
      const div = document.createElement("div");
      div.className = "game-item";

      if (item.visible) {
        div.innerHTML = `<img src="${item.cover}" alt="${item.title}"><p>${item.title}</p>`;
        if (type === "app") {
          div.addEventListener("click", () => openAppIframe(item));
        } else {
          div.addEventListener("click", () => window.location.href = item.url);
        }
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
    leftBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -carousel.clientWidth * 0.7, behavior: "smooth" });
    });
    carouselContainer.appendChild(leftBtn);

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

// Load apps
fetch("apps/apps.json")
  .then(res => res.json())
  .then(data => renderSections(data, "app"))
  .catch(err => console.error("Failed to load apps.json:", err));

// Load games
fetch("games/games.json")
  .then(res => res.json())
  .then(data => renderSections(data, "game"))
  .catch(err => console.error("Failed to load games.json:", err));
