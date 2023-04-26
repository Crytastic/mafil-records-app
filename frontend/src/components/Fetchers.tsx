import DateRange from './DateRangeSelector';

export async function fetchStudies(dateRange: DateRange) {
  const url = `http://devel.mafildb.ics.muni.cz:8000/json?start=${dateRange.start}&end=${dateRange.end}&level=STUDY&force_pacs`;

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
  const url = `http://devel.mafildb.ics.muni.cz:8000/json?accession_number=${accessionNumber}&level=SERIES`;

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