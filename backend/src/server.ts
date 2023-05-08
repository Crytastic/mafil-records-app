const express = require("express");
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send(`Backend server is running on port ${port}`);
});

app.get("/api", (req, res) => {
  res.send(`Backend API accessible`);
});

app.get('/api/study', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM studiesdt');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

app.post('/api/study', async (req, res) => {
  const studyData = req.body;
  console.log('Saving study data to the database:', studyData);

  try {
    await pool.query(
      `INSERT INTO studiesdt (StudyInstanceUID, GeneralComment)
        VALUES ($1, $2)
        ON CONFLICT (StudyInstanceUID)
        DO UPDATE SET
          GeneralComment = $2`,
      [
        studyData.StudyInstanceUID,
        studyData.GeneralComment,
      ]
    );
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


app.get('/api/series', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM seriesdt');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

app.post('/api/series', async (req, res) => {
  const seriesDataArray = req.body;
  console.log('Saving series data to the database:', seriesDataArray);

  try {
    await Promise.all(
      seriesDataArray.map(async (seriesData) => {
        await pool.query(
          `INSERT INTO seriesdt (SeriesInstanceUID, SeqState, Measured, LastUpdated, MeasurementNotes,
            StimProtocol, StimLogFile, FyzioRawFile, GeneralEEG, GeneralET, BPEKG, BPResp, BPGSR, BPAcc,
            SiemensEKG, SiemensResp, SiemensGSR, SiemensAcc)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          ON CONFLICT (SeriesInstanceUID)
          DO UPDATE SET
            SeqState = $2,
            Measured = $3,
            LastUpdated = $4,
            MeasurementNotes = $5,
            StimProtocol = $6,
            StimLogFile = $7,
            FyzioRawFile = $8,
            GeneralEEG = $9,
            GeneralET = $10,
            BPEKG = $11,
            BPResp = $12,
            BPGSR = $13,
            BPAcc = $14,
            SiemensEKG = $15,
            SiemensResp = $16,
            SiemensGSR = $17,
            SiemensAcc = $18`,
          [
            seriesData.SeriesInstanceUID,
            seriesData.seq_state,
            seriesData.measured,
            seriesData.last_updated,
            seriesData.measurement_notes,
            seriesData.stim_protocol,
            seriesData.stim_log_file,
            seriesData.fyzio_raw_file,
            seriesData.general_eeg,
            seriesData.general_et,
            seriesData.bp_ekg,
            seriesData.bp_resp,
            seriesData.bp_gsr,
            seriesData.bp_acc,
            seriesData.siemens_ekg,
            seriesData.siemens_resp,
            seriesData.siemens_gsr,
            seriesData.siemens_acc,
          ]
        );
      })
    );
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
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
