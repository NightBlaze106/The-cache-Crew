const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Update this to match your frontend URL
const allowedOrigins = ['http://localhost:8000', 'http://127.0.0.1:5501', 'http://localhost:8080'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.get('/api/planets', async (req, res) => {
    try {
        const query = `select top 5000 pl_name,pl_orbper,pl_rade,pl_bmasse,pl_eqt,hostname from ps where pl_name is not null`;
        const encodedQuery = encodeURIComponent(query);
        const url = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${encodedQuery}&format=json`;
        
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching planet data:', error);
        res.status(500).json({ error: 'Error fetching planet data' });
    }
});

app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    console.log('Received search query:', query);

    try {
        const allPlanets = JSON.parse(fs.readFileSync('path/to/your/planets.json', 'utf8'));
        console.log(`Total planets in file: ${allPlanets.length}`);

        const matchingPlanets = allPlanets.filter(planet => {
            const nameMatch = planet.pl_name && planet.pl_name.toLowerCase().includes(query.toLowerCase());
            const hostMatch = planet.hostname && planet.hostname.toLowerCase().includes(query.toLowerCase());
            return nameMatch || hostMatch;
        });

        console.log(`Found ${matchingPlanets.length} matching planets`);
        console.log('First matching planet:', matchingPlanets[0]);

        res.json(matchingPlanets);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'An error occurred while searching' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
