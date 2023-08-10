export function numbersAfterDecimal(str,val) {
  str = str.toString();
  str = str.slice(0, (str.indexOf(".")) + val + 1);
  return Number(str);
}

export function calcPercentage(large, small) {
  let percent = (large - small) / large * 100
  return `${(100 - percent).toFixed()}%`;
}


