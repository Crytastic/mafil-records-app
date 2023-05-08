export async function saveSeriesData(StudyInstanceUID: string): Promise<boolean> {
  let success = false;

  try {
    const seriesKeys = Object.keys(localStorage).filter((key) => key.startsWith(`series-${StudyInstanceUID}`));
    const seriesDataArray = seriesKeys.map((key) => JSON.parse(localStorage.getItem(key) || '{}'));
    console.log(seriesDataArray);

    const response = await fetch('/api/series', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seriesDataArray),
    });

    if (response.ok) {
      console.log('Series data saved to the database');
      success = true;
    } else {
      console.error('Failed to save series data to the database');
    }
  } catch (error) {
    console.error('Error saving series data:', error);
  }

  return success;
}

export async function saveStudyData(StudyInstanceUID: string): Promise<boolean> {
  let success = false;

  try {
    const studyDataString = localStorage.getItem(`study-${StudyInstanceUID}`);
    const studyData = studyDataString ? JSON.parse(studyDataString) : {};

    const response = await fetch('/api/study', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studyData),
    });

    if (response.ok) {
      console.log('Study data saved to the database');
      success = true;
    } else {
      console.error('Failed to save study data to the database');
    }
  } catch (error) {
    console.error('Error saving study data:', error);
  }

  return success;
}