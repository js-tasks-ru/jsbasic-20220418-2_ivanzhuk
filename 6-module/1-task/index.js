/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this._rows = rows;
    this._elem = document.createElement('table');
    this._makeMarkup()
  }

  get elem() {
    return this._elem
  }

  _makeMarkup() {
    let markup = `
      <thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
      </thead>
      <tbody>` +
      this._rows.map((person) => `
        <tr>
          <td>${person.name}</td>
          <td>${person.age}</td>
          <td>${person.salary}</td>
          <td>${person.city}</td>
          <td><button>X</button></td>
        </tr>
        `
      ).join("") + `</tbody>`;

    this._elem.innerHTML = markup;

    const buttons = Array.from(this._elem.querySelectorAll('button'))
    buttons.forEach((button) => {
      button.addEventListener('click', this._deleteRow);
    })
  }

  _deleteRow(e) {
    const row = e.target.parentElement.parentElement;
    row.remove()
  }
}
