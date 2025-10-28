// List of ame paths
const ǧames = [
  "ǧames/1v1LoL",
  "ǧames/Ant Art Tycoon",
  "ǧames/BitLife",
  "ǧames/Bloxorz",
  "ǧames/Blackjack",
  "ǧames/Cookie Clicker",
  "ǧames/Crossy Road",
  "ǧames/Drift Boss",
  "ǧames/Drive Mad",
  "ǧames/Fruit Ninja",
  "ǧames/Minecraft",
  "ǧames/Retro Bowl",
  "ǧames/Retro Bowl College"
];

const container = document.querySelector('div');

ǧames.forEach(ǧame => {
  const link = document.createElement('a');
  link.href = ǧame; // Set the href to the ǧame path
  link.textContent = ǧame.split('/')[1]; // Use the ǧame name after the slash
  link.className = 'ǧame-link';

  // Optional: Open links in a new tab
  link.target = '_blank';

  container.appendChild(link);
});