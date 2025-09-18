// ===== NAVBAR SHRINK ON SCROLL & TOGGLE =====
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('ul.nav-links');

// Toggle mobile nav
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Shrink navbar on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('shrink');
  } else {
    nav.classList.remove('shrink');
  }
});

// Close mobile nav when clicking a link
document.querySelectorAll('ul.nav-links li a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== LOAD APPS FROM apps.json =====
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
          item.addEventListener("click", () => openIframe(app.url));
        } else {
          item.innerHTML = `<div class="placeholder"></div>`;
        }

        carousel.appendChild(item);
      });

      carouselContainer.appendChild(carousel);

      // Scroll buttons
      createScrollButtons(carouselContainer, carousel);

      sectionDiv.appendChild(carouselContainer);
      container.appendChild(sectionDiv);
    }

    initSearch();
  })
  .catch(err => console.error("Failed to load apps.json:", err));

// ===== LOAD GAMES FROM games.json =====
fetch("games.json")
  .then(res => res.json())
  .then(data => {
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

      data[sectionName].forEach(game => {
        const item = document.createElement("div");
        item.className = "game-item";

        if (game.visible) {
          item.innerHTML = `<img src="${game.cover}" alt="${game.title}"><p>${game.title}</p>`;
          item.addEventListener("click", () => openIframe(game.url));
        } else {
          item.innerHTML = `<div class="placeholder"></div>`;
        }

        carousel.appendChild(item);
      });

      carouselContainer.appendChild(carousel);
      createScrollButtons(carouselContainer, carousel);

      sectionDiv.appendChild(carouselContainer);
      container.appendChild(sectionDiv);
    }

    initSearch();
  })
  .catch(err => console.error("Failed to load games.json:", err));

// ===== SCROLL BUTTON CREATOR =====
function createScrollButtons(container, carousel) {
  const leftBtn = document.createElement("button");
  leftBtn.className = "scroll-btn left";
  leftBtn.innerHTML = "&#10094;";
  leftBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -carousel.clientWidth * 0.7, behavior: "smooth" });
  });

  const rightBtn = document.createElement("button");
  rightBtn.className = "scroll-btn right";
  rightBtn.innerHTML = "&#10095;";
  rightBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: carousel.clientWidth * 0.7, behavior: "smooth" });
  });

  container.appendChild(leftBtn);
  container.appendChild(rightBtn);
}

// ===== SEARCH FILTER =====
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

// ===== IFRAME OVERLAY =====
function openIframe(url) {
  const overlay = document.createElement("div");
  overlay.className = "iframe-overlay";

  const iframe = document.createElement("iframe");
  iframe.src = url;

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "×";
  closeBtn.addEventListener("click", () => document.body.removeChild(overlay));

  overlay.appendChild(closeBtn);
  overlay.appendChild(iframe);
  document.body.appendChild(overlay);
}
