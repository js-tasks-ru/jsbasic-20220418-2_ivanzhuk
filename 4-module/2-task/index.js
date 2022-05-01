function makeDiagonalRed(table) {
  const length = table.rows.length
  for (let i = 0; i < length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
