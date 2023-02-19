import { Request, Response } from 'express';
const PORT = process.env.PORT ?? 8000
const express = require('express');
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('BACKEND ON http://localhost:8000/')
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));