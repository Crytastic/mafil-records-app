CREATE TABLE IF NOT EXISTS seriesdt (
  SeriesInstanceUID VARCHAR(255) PRIMARY KEY,
  SeqState VARCHAR(255) DEFAULT 'pending',
  Measured TIMESTAMP DEFAULT NOW(),
  LastUpdated TIMESTAMP DEFAULT NOW(),
  MeasurementNotes TEXT,
  StimProtocol VARCHAR(255),
  StimLogFile VARCHAR(255),
  FyzioRawFile VARCHAR(255),
  GeneralEEG BOOLEAN DEFAULT false,
  GeneralET BOOLEAN DEFAULT false,
  BPEKG BOOLEAN DEFAULT false,
  BPResp BOOLEAN DEFAULT false,
  BPGSR BOOLEAN DEFAULT false,
  BPAcc BOOLEAN DEFAULT false,
  SiemensEKG BOOLEAN DEFAULT false,
  SiemensResp BOOLEAN DEFAULT false,
  SiemensGSR BOOLEAN DEFAULT false,
  SiemensAcc BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS studiesdt (
  study_instance_uid VARCHAR(255) PRIMARY KEY,
  general_comment TEXT
);
