// Define a variable to hold the games list; it starts empty and gets populated with a hardcoded list.
let games = [
    "games/1v1Lol/index.html",
    "games/Ant Art Tycoon/index.html",
    "games/BitLife/index.html",
    "games/Bloxorz/index.html",
    "games/Blackjack/index.html",
    "games/Cookie Clicker/index.html",
    "games/Crossy Road/index.html",
    "games/Drift Boss/index.html",
    "games/Drive Mad/index.html",
    "games/Fruit Ninja/index.html",
    "games/Geometry Dash/index.html",
    "games/Google/index.html",
    "games/Google Baseball/index.html",
    "games/Granny/index.html",
    "games/Learn to Fly Idle/index.html",
    "games/Minecraft/index.html",
    "games/Moto X3M/index.html",
    "games/Plant vs. Zombies/index.html",
    "games/Retro Bowl/index.html",
    "games/Retro Bowl College/index.html",
    "games/Rom Emulator/index.html",
    "games/Sandboxels/index.html",
    "games/Sandspiel/index.html",
    "games/Stickman Hook/index.html",
    "games/Subway Surfers/index.html"
];

const container = document.querySelector('div');

/**
 * Helper function to create a readable name from the path (the folder name).
 */
function getGameDisplayName(gamePath) {
    const segments = gamePath.split('/');
    let name = segments.pop(); // Get the last segment (e.g., index.html or 1v1Lol)
    // If the last segment was a file name, use the segment before it (the folder name)
    if (name.endsWith('.html') || name.endsWith('.htm')) {
        name = segments.pop(); // e.g., gets Blackjack
    }
    // Replace common separators with spaces for better display if needed (optional)
    name = name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/-/g, ' ');
    return name;
}

// Function to create and display game links based on a single letter filter
function displayGames(filter = '') {
    container.innerHTML = ''; // Clear existing games
    const firstLetterFilter = filter.trim().charAt(0).toLowerCase();

    // Ensure games array is populated before filtering
    if (games.length === 0) {
        const noGamesMsg = document.createElement('p');
        noGamesMsg.textContent = "No games available to display.";
        container.appendChild(noGamesMsg);
        return;
    }

    const filteredGames = games.filter(gamePath => {
        if (!firstLetterFilter) return true;
        const displayName = getGameDisplayName(gamePath);
        return displayName.charAt(0).toLowerCase() === firstLetterFilter;
    });

    if (filteredGames.length === 0 && firstLetterFilter.length > 0) {
        const noResults = document.createElement('p');
        noResults.textContent = `No games found starting with ${firstLetterFilter.toUpperCase()}.`;
        container.appendChild(noResults);
        return;
    }

    filteredGames.forEach(gamePath => {
        const link = document.createElement('a');
        link.href = gamePath;
        link.textContent = getGameDisplayName(gamePath);
        link.className = 'game-link';
        link.target = '_blank';
        container.appendChild(link);
    });
}

// Function called by the onkeyup event in index.html (for live search)
function searchGames() {
    const searchInput = document.getElementById('searchInput');
    displayGames(searchInput.value);
}

// Function to clear the search filter and display all games
// You can call this function using a button in your HTML: <button onclick="resetSearch()">Reset Search</button>
function resetSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = ''; // Clear the input field
    }
    displayGames(); // Display all games (empty filter value)
}

// Sort the list alphabetically by display name once the script loads
games.sort((a, b) => {
    const nameA = getGameDisplayName(a).toLowerCase();
    const nameB = getGameDisplayName(b).toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
});

// Initial display of all sorted games *after* the list is ready
displayGames();
