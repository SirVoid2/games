// Define a variable to hold the games list; it starts empty and gets populated by fetch.
let games = [];

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
        // If the list is empty, assume it's still loading or an error occurred
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

/**
 * Function to fetch the game list from a website/API endpoint.
 */
async function fetchGamesList() {
    try {
        // Fetch the games list from the 'games.json' file using a relative path
        const response = await fetch('games.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        games = await response.json(); // Assign fetched data to the 'games' variable

        // Sort the list alphabetically by display name once after fetching
        games.sort((a, b) => {
            const nameA = getGameDisplayName(a).toLowerCase();
            const nameB = getGameDisplayName(b).toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        // Initial display of all sorted games *after* the list is ready
        displayGames();

    } catch (error) {
        console.error("Could not fetch the game list:", error);
        // Display an error message in the container
        container.innerHTML = `<p>Error loading games list. Please ensure <code>games.json</code> exists and is accessible.</p>`;
    }
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

// Call the fetch function to start the process when the page loads
fetchGamesList();

setTimeout(function(){ 
    window.location.reload(1); 
}, 2000);
