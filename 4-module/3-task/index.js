function highlight(table) {
  const length = table.rows.length
  for (let i = 1; i < length; i++) {
    if (table.rows[i].cells[3].dataset.available === 'true') {
      table.rows[i].classList.add('available');
    } else if (table.rows[i].cells[3].dataset.available === 'false') {
      table.rows[i].classList.add('unavailable');
    } else {
      table.rows[i].setAttribute('hidden', true);
    }

    table.rows[i].cells[2].textContent === 'm' ? table.rows[i].classList.add('male') : table.rows[i].classList.add('female');
    if (table.rows[i].cells[1].textContent < 18) {
      table.rows[i].style.textDecoration = "line-through";
    }
  }
}
