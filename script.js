// ======= SCROLL BUTTONS FOR CAROUSELS =======
document.querySelectorAll('.carousel-container').forEach(container => {
  const carousel = container.querySelector('.carousel');
  const leftBtn = container.querySelector('.scroll-btn.left');
  const rightBtn = container.querySelector('.scroll-btn.right');

  // Scroll amount per click
  const scrollAmount = 200;

  // Left button click
  leftBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  // Right button click
  rightBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Function to check scroll and hide/show buttons
  function updateButtons() {
    // Hide left button if at start
    if (carousel.scrollLeft <= 0) {
      leftBtn.style.display = 'none';
    } else {
      leftBtn.style.display = 'flex';
    }

    // Hide right button if at end
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
      rightBtn.style.display = 'none';
    } else {
      rightBtn.style.display = 'flex';
    }
  }

  // Update buttons on scroll
  carousel.addEventListener('scroll', updateButtons);

  // Initial check
  updateButtons();
});

// ======= SEARCH FILTER FOR GAMES =======
const input = document.querySelector('.search input');
const gameItems = document.querySelectorAll('.game-item');

if (input) {
  input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase();
    gameItems.forEach(game => {
      const title = game.querySelector('p').textContent.toLowerCase();
      if (title.includes(searchTerm)) {
        game.style.display = 'block';
      } else {
        game.style.display = 'none';
      }
    });
  });
}
