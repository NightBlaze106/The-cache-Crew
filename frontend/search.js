document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const compareButton = document.getElementById('compare-button');
    const backButton = document.getElementById('back-button');

    // Get the search query from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        searchBar.value = query;
        performSearch(query);
    }

    searchButton.addEventListener('click', () => {
        performSearch(searchBar.value.trim());
    });

    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchBar.value.trim());
        }
    });

    compareButton.addEventListener('click', () => {
        // Implement comparison logic here
        console.log('Compare button clicked');
    });

    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    async function performSearch(query) {
        try {
            console.log('Performing search for:', query);
            const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(query)}`);
            console.log('Search response:', response);
            
            const text = await response.text();
            console.log('Response text:', text);
            
            const planets = text ? JSON.parse(text) : [];
            console.log('Planets data:', planets);
            
            displaySearchResults(planets);
        } catch (error) {
            console.error('Error performing search:', error);
            searchResults.innerHTML = '<p>Error loading search results.</p>';
        }
    }

    function displaySearchResults(planets) {
        console.log('Displaying search results for', planets.length, 'planets');
        searchResults.innerHTML = '';
        if (planets.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }
        planets.forEach(planet => {
            const planetCard = createPlanetCard(planet);
            searchResults.appendChild(planetCard);
        });
    }

    function createPlanetCard(planet) {
        const card = document.createElement('div');
        card.className = 'planet-card';
        card.innerHTML = `
            <h2>${planet.pl_name || 'Unknown'}</h2>
            <ul class="attributes">
                <li><i class="fas fa-star"></i> Host Star: ${planet.hostname || 'Unknown'}</li>
                <li><i class="fas fa-sync"></i> Orbital Period: ${formatValue(planet.pl_orbper, 'days')}</li>
                <li><i class="fas fa-ruler-combined"></i> Radius: ${formatValue(planet.pl_rade, 'Earth radii')}</li>
                <li><i class="fas fa-weight-hanging"></i> Mass: ${formatValue(planet.pl_bmasse, 'Earth masses')}</li>
                <li><i class="fas fa-thermometer-half"></i> Equilibrium Temperature: ${formatValue(planet.pl_eqt, 'K')}</li>
            </ul>
        `;
        return card;
    }

    function formatValue(value, unit) {
        if (value === undefined || value === null) return 'Unknown';
        return `${parseFloat(value).toFixed(2)} ${unit}`;
    }
});
