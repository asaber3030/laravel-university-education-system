export function fileName(path) {
  let arr = path.split('/');
  return arr[arr.length - 1]
}

export function fileExtension(file) {
  let arr = file.split('.');
  return arr[arr.length - 1]
}
