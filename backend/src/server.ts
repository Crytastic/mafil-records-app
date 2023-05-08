const express = require("express");
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send(`Backend server is running on port ${port}`);
});

app.get("/api", (req, res) => {
  res.send(`Backend API accessible`);
});

app.get('/api/series', async (req, res) => {
  res.send(`Saving series API accessible`);
});

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

app.use(cors());
app.use(express.json());

app.post('/api/series', async (req, res) => {
  console.log('Saving series data to database:', req.body);
  res.status(200).send();
});

app.get('/api/series/:seriesInstanceUID', async (req, res) => {
  const { seriesInstanceUID } = req.params;
  try {
    const { rows } = await pool.query('SELECT series_data FROM seriesdt WHERE series_instance_uid = $1', [seriesInstanceUID]);
    res.status(200).json(rows[0]?.series_data ?? null);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
