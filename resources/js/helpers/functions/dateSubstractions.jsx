export function daySubstract(d1, d2) {
  return Math.abs(new Date(d1).getDate() - new Date(d2).getDate())
}

export function monthSubstract(d1, d2) {
  return Math.abs(new Date(d1).getMonth() - new Date(d2).getMonth())
}

export function yearSubstract(d1, d2) {
  return Math.abs(new Date(d1).getFullYear() - new Date(d2).getFullYear())
}

export function today() {
  return new Date();
}
