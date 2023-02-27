import { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
const pool = require('./db');
const PORT = process.env.PORT ?? 8000
const app = express();

app.use(cors());

app.get('/sequences', async (req: Request, res: Response) => {
  try {
    const sequences = await pool.query('SELECT * FROM sequences;')
    res.json(sequences.rows)
  } catch (err) {
    console.error(err)
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));