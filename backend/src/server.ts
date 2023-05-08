require('dotenv').config();
const express = require("express");
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Backend server is running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

app.use(cors());
app.use(express.json());

app.post('/api/series', async (req, res) => {
  const { seriesInstanceUID, seriesData } = req.body;
  try {
    await pool.query(
      'INSERT INTO series (series_instance_uid, series_data) VALUES ($1, $2) ON CONFLICT (series_instance_uid) DO UPDATE SET series_data = $2',
      [seriesInstanceUID, JSON.stringify(seriesData)]
    );
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

app.get('/api/series/:seriesInstanceUID', async (req, res) => {
  const { seriesInstanceUID } = req.params;
  try {
    const { rows } = await pool.query('SELECT series_data FROM series WHERE series_instance_uid = $1', [seriesInstanceUID]);
    res.status(200).json(rows[0]?.series_data ?? null);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
