// List of game paths
const games = [
  "games/1v1LoL",
  "games/Ant Art Tycoon",
  "games/BitLife",
  "games/Bloxorz",
  "games/Blackjack",
  "games/Cookie Clicker",
  "games/Crossy Road",
  "games/Drift Boss",
  "games/Drive Mad",
  "games/Fruit Ninja",
  "games/Minecraft",
  "games/Retro Bowl",
  "games/Retro Bowl College"
];

const container = document.querySelector('div');

games.forEach(game => {
  const link = document.createElement('a');
  link.href = game; // Set the href to the game path
  link.textContent = game.split('/')[1]; // Use the game name after the slash
  link.className = 'game-link';

  // Optional: Open links in a new tab
  link.target = '_blank';

  container.appendChild(link);
});

setTimeout(function() {
    location.reload();
    }, 200); // Reloads the page