export function formatDateToISOString(date: Date): string {
  const dateString = date.toISOString();
  return dateString.slice(0, 19); // Remove the milliseconds and 'Z' at the end
}