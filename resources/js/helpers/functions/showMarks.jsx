export function showMarks(grade) {
  return `${grade > 0 ? grade : '0'} mark` + `${grade === 0 ? '' : 's'}`
}
