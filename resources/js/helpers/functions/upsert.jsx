function upsert(array, element) { // (1)
  const i = array.findIndex(_element => _element.id === element.id);
  if (i > -1) array[i] = element; // (2)
  else array.push(element);
}

export default upsert
