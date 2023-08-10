export default function capitilize(sentence) {
  let finalText = '';
  let arrayOfWords = sentence.split(' ')
  for (let i = 0; i < arrayOfWords.length; i++) {
    arrayOfWords[i] = arrayOfWords[i].charAt(0).toUpperCase() + arrayOfWords[i].slice(1)
  }
  return arrayOfWords.join(" ")
}
