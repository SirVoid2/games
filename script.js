// List of game paths
const games = [
  "games/1v1LoL",
  "games/Ant Art Tycoon",
  "games/BitLife",
  "games/Bloxorz",
  "games/Blackjack/index.html",
  "games/Cookie Clicker",
  "games/Crossy Road",
  "games/Drift Boss",
  "games/Drive Mad",
  "games/Fruit Ninja",
  "games/Geometry Dash",
  "games/Learn to Fly Idle",
  "games/Minecraft",
  "games/Moto X3M",
  "games/Retro Bowl",
  "games/Retro Bowl College",
  "games/Sandboxels/index.html",
  "games/Sandspiel",
  "games/Stickman Hook"
  "games/Subway Surfers"

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
    }, 50); // Reloads the page