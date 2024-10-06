// Disable animations and transitions
(function() {
    // Override requestAnimationFrame
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 0);
    };

    // Create a style element to override animations
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
        }
    `;
    document.head.appendChild(style);

    // Force a repaint to apply changes
    document.body.offsetHeight;
})();

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-button');
    const planetCard1 = document.getElementById('planet-card-1');
    const planetCard2 = document.getElementById('planet-card-2');

    searchButton.addEventListener('click', () => {
        const query = searchBar.value.trim();
        if (query) {
            window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
        }
    });

    fetchRandomPlanets();

    async function fetchRandomPlanets() {
        try {
            const response = await fetch('http://localhost:3000/api/planets');
            const planets = await response.json();
            
            if (planets.length < 2) {
                throw new Error('Not enough planets returned from the API');
            }

            const randomPlanets = getRandomPlanets(planets, 2);
            displayPlanet(randomPlanets[0], planetCard1);
            displayPlanet(randomPlanets[1], planetCard2);
        } catch (error) {
            console.error('Error fetching random planets:', error);
            planetCard1.innerHTML = '<p>Error loading planet data.</p>';
            planetCard2.innerHTML = '<p>Error loading planet data.</p>';
        }
    }

    function getRandomPlanets(planets, count) {
        const shuffled = [...planets].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function displayPlanet(planet, cardElement) {
        if (!planet) {
            console.error('Planet data is undefined or null');
            cardElement.innerHTML = '<p>Error: Planet data not available</p>';
            return;
        }
        
        let planetType = getPlanetType(planet.pl_bmasse);
        let planetImage = getPlanetImage(planetType);

        const html = `
            <div class="planet-image" style="background-image: url('${planetImage}');"></div>
            <h2>${planet.pl_name || 'Unknown'}</h2>
            <ul class="attributes">
                <li><i class="fas fa-globe"></i> Type: ${planetType}</li>
                <li><i class="fas fa-weight-hanging"></i> Mass: ${formatValue(planet.pl_bmasse, 'Earth masses')}</li>
                <li><i class="fas fa-ruler-combined"></i> Radius: ${formatValue(planet.pl_rade, 'Earth radii')}</li>
                <li><i class="fas fa-sync"></i> Orbital Period: ${formatValue(planet.pl_orbper, 'days')}</li>
                <li><i class="fas fa-thermometer-half"></i> Equilibrium Temperature: ${formatValue(planet.pl_eqt, 'K')}</li>
            </ul>
        `;
        cardElement.innerHTML = html;
    }

    function getPlanetType(mass) {
        if (mass === undefined || mass === null) return "Unknown";
        if (mass < 10) return "Rocky";
        if (mass < 50) return "Super-Earth";
        return "Gas Giant";
    }

    function getPlanetImage(type) {
        switch (type) {
            case "Rocky": return 'images/rocky-planet.jpg';
            case "Super-Earth": return 'images/super-earth.jpg';
            case "Gas Giant": return 'images/gas-giant.jpg';
            default: return 'images/unknown-planet.jpg';
        }
    }

    function formatValue(value, unit) {
        if (value === undefined || value === null) return 'Unknown';
        return `${parseFloat(value).toFixed(2)} ${unit}`;
    }

    // Remove the getPlanetColor function as we're now using images
});
