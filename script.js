// Define a variable to hold the games list; it starts empty and gets populated with a hardcoded list.
let games = [
    "https://rizzgames.vercel.app/games/1v1Lol/index.html",
    "https://rizzgames.vercel.app/games/Ant Art Tycoon/index.html",
    "https://rizzgames.vercel.app/games/BitLife/index.html",
    "https://rizzgames.vercel.app/games/Bloxorz/index.html",
    "https://rizzgames.vercel.app/games/Blackjack/index.html",
    "https://rizzgames.vercel.app/games/Cookie Clicker/index.html",
    "https://rizzgames.vercel.app/games/Crossy Road/index.html",
    "https://rizzgames.vercel.app/games/Drift Boss/index.html",
    "https://rizzgames.vercel.app/games/Drive Mad/index.html",
    "https://rizzgames.vercel.app/games/Fruit Ninja/index.html",
    "https://rizzgames.vercel.app/games/Geometry Dash/index.html",
    "https://rizzgames.vercel.app/games/Google/index.html",
    "https://rizzgames.vercel.app/games/Google Baseball/index.html",
    "https://rizzgames.vercel.app/games/Granny/index.html",
    "https://rizzgames.vercel.app/games/Learn to Fly Idle/index.html",
    "https://rizzgames.vercel.app/games/Minecraft/index.html",
    "https://rizzgames.vercel.app/games/Moto X3M/index.html",
    "https://rizzgames.vercel.app/games/Plant vs. Zombies/index.html",
    "https://rizzgames.vercel.app/games/Retro Bowl/index.html",
    "https://rizzgames.vercel.app/games/Retro Bowl College/index.html",
    "https://rizzgames.vercel.app/games/Rom Emulator/index.html",
    "https://rizzgames.vercel.app/games/Sandboxels/index.html",
    "https://rizzgames.vercel.app/games/Sandspiel/index.html",
    "https://rizzgames.vercel.app/games/Stickman Hook/index.html",
    "https://rizzgames.vercel.app/games/Subway Surfers/index.html"
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
