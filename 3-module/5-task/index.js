function getMinMax(str) {
  const result = str.split(' ').map((item) => {
    return item / 1
  }).filter((item) => item).sort((a, b) => a - b)
  return {
    min: result[0],
    max: result[result.length - 1]
  }
}
