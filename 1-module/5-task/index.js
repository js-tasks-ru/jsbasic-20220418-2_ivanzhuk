function truncate(str, maxlength) {
  if (str.length + 1 > maxlength) {
    return str.substring(0, maxlength - 1) + '…'
  } else {
    return str
  }
}
