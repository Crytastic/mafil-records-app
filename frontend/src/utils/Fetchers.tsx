import { SeriesData } from '../components/series/Series';
import DateRange from '../components/studies/DateRangeSelector';
import { StudyData } from '../pages/Measuring';

export async function fetchStudies(dateRange: DateRange) {
  const url = `https://pacs-api.devel.mafildb.ics.muni.cz/json?start=${dateRange.start}&end=${dateRange.end}&level=STUDY&force_pacs`;

  try {
    const resp = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Token c07d70fd9f56bc470a83c28bcd0a4718ff198570'
        },
        mode: 'cors',
      });
    const json = await resp.json();
    const parsedVisits = json.map((visit: any) => {
      const parsedDate = new Date(visit.StudyDate.substr(0, 4), parseInt(visit.StudyDate.substr(4, 2)) - 1, visit.StudyDate.substr(6, 2));
      return { ...visit, StudyDate: parsedDate };
    });
    return parsedVisits;
  } catch (err) {
    console.error(err)
    throw err;
  }
}

export async function fetchSeries(accessionNumber: string) {
  const url = `https://pacs-api.devel.mafildb.ics.muni.cz/json?accession_number=${accessionNumber}&level=SERIES`;

  try {
    const resp = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Token c07d70fd9f56bc470a83c28bcd0a4718ff198570'
        },
        mode: 'cors',
      });
    const json = await resp.json();
    return json[0].series;
  } catch (err) {
    console.error(err)
    throw err;
  }
}

export async function fetchSeriesData(SeriesInstanceUID: string): Promise<SeriesData | null> {
  try {
    const response = await fetch(`/api/series/${SeriesInstanceUID}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch series data from the database');
      return null;
    }
  } catch (error) {
    console.error('Error fetching series data:', error);
    return null;
  }
}

export async function fetchStudyData(studyInstanceUID: string) {
  let studyData: StudyData | null = null;

  const localStudy = localStorage.getItem(`study-${studyInstanceUID}`);
  if (localStudy) {
    studyData = JSON.parse(localStudy);
  } else {
    try {
      const response = await fetch(`/api/study/${studyInstanceUID}`);

      if (response.ok) {
        studyData = await response.json();
      }
    } catch (error) {
      console.error('Error fetching study data:', error);
    }
  }

  if (!studyData) {
    studyData = {
      StudyInstanceUID: studyInstanceUID,
      general_comment: '',
    };
  }

  return studyData;
}
