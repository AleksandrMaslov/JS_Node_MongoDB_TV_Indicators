export function GetDate(timestamp) {
  const dateObject = new Date(timestamp)
  const date = dateObject.toLocaleDateString()
  const time = dateObject.toLocaleTimeString()
  return `${convertDateString(date)}_${time}`
}

function convertDateString(dateString) {
  return dateString.split('.').reverse().join('.')
}
