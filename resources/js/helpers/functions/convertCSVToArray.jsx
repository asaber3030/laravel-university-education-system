export function readCSV(file) {
  let reader = new FileReader()
  let csvOutput = '';
  reader.onload = (event) => {
    csvOutput = event.target.result
  }
  return reader.readAsText(file)
}
