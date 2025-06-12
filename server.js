const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const API_URL = 'https://api.football-data.org/v4/teams/86/matches?status=SCHEDULED';


app.get('http://localhost:3000/matches', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const events = response.data.events;

    if (!events) return res.status(404).json({ message: 'No matches found' });

    const matches = events.map(event => ({
      team1: event.strHomeTeam,
      team2: event.strAwayTeam,
      date: `${event.dateEvent} ${event.strTime}`,
    }));

    res.json(matches);
  }
  catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).send('Failed to fetch matches');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
