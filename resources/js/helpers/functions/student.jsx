export function showStudentPhone(student) {
  return `+20 ${student.phone}`
}
export function showStudentUsername(student) {
  return `${student.username}`
}
export function showStudentDepartment(student) {
  return `${student.department.title}`
}

export function nationalID(ID) {
  let matchingElements = ID.toString().match(/.{1,4}/g)
  return matchingElements.join(' ')
}
