import DateRange from '../components/studies/DateRangeSelector';

export async function fetchStudies(dateRange: DateRange) {
  const url = `/api/pacs/studies?start=${dateRange.start}&end=${dateRange.end}`;

  try {
    const resp = await fetch(
      url,
      {
        method: 'GET',
        mode: 'cors',
      });
    const parsedVisits = await resp.json();
    return parsedVisits;
  } catch (err) {
    throw err;
  }
}

export async function fetchSeries(accessionNumber: string) {
  const url = `/api/pacs/series?accession_number=${accessionNumber}`;

  try {
    const resp = await fetch(
      url,
      {
        method: 'GET',
        mode: 'cors',
      });
    const series = await resp.json();
    return series;
  } catch (err) {
    console.error(err)
    throw err;
  }
}