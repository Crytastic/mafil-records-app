CREATE DATABASE notetakingmeasuringapp;

CREATE TABLE sequences (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255),
  measured VARCHAR(300),
  last_updated VARCHAR(300),
  seq_state VARCHAR(255),
  expanded boolean,
  measurement_notes VARCHAR(600),
  stim_log_file VARCHAR(255),
  fyzio_raw_file VARCHAR(255),
  general_eeg boolean,
  general_et boolean,
  bp_ekg boolean,
  bp_resp boolean,
  bp_gsr boolean,
  bp_acc boolean,
  siemens_ekg boolean,
  siemens_resp boolean,
  siemens_gsr boolean,
  siemens_acc boolean
);

CREATE TABLE users (
  user_login VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);

INSERT INTO sequences (id, title, measured, last_updated) VALUES('42', 'SpinEchoFieldMap-AP', '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01');

INSERT INTO sequences (id, title, measured, last_updated, seq_state, expanded, measurement_notes,
  stim_log_file,
  fyzio_raw_file,
  general_eeg,
  general_et,
  bp_ekg,
  bp_resp,
  bp_gsr,
  bp_acc,
  siemens_ekg,
  siemens_resp,
  siemens_gsr,
  siemens_acc)
VALUES
('42', 'SpinEchoFieldMap-AP', '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01', 'pending', '0', '', '', '', '0', '0','0','0','0','0','0','0','0','0'),
('43', 't1_mprage_sag_p2_1iso_FoV-256', '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01','pending', '0', '', '', '', '0', '0','0','0','0','0','0','0','0','0'),
('44', 'dMRI_b5000_PA_131dir_5shell_ADC', '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01', 'pending', '0','', '', '', '0', '0','0','0','0','0','0','0','0','0'),
('45', 'dMRI_b5000_PA_131dir_5shell',  '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01', 'pending', '0','', '', '', '0', '0','0','0','0','0','0','0','0','0'),
('46', 'AAHead_Scout_MPR_tra',  '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01', 'pending', '0','', '', '', '0', '0','0','0','0','0','0','0','0','0'),
('47', 'cmrr_bold_mb6_tr0s65_FS_x1840_3iso',  '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01','pending', '0', '', '', '', '0', '0','0','0','0','0','0','0','0','0'),
('4', 'cmrr_bold_mb6_tr0s65_FS_x1840_3iso_SBRef',  '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01', 'pending', '0','', '', '', '0', '0','0','0','0','0','0','0','0','0'),
('5', 'dMRI_b5000_AP_131dir_5shell_TENSOR',  '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01','pending', '0', '', '', '', '0', '0','0','0','0','0','0','0','0','0'),
('6', 'localizer',  '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01', 'pending', '0','', '', '', '0', '0','0','0','0','0','0','0','0','0');