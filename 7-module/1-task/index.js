import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._element = null;
    this._addMarkup();
    this._arrowLeft = this._element.querySelector('.ribbon__arrow_left');
    this._arrowRight = this._element.querySelector('.ribbon__arrow_right');
    this._inner = this._element.querySelector('.ribbon__inner');
    this._setEvtListeners();
  }

  get elem() {
    return this._element
  }

  _checkVisability = () => {
    const scrollWidth = this._inner.scrollWidth;
    const scrollLeft = this._inner.scrollLeft;
    const clientWidth = this._inner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (this._inner.scrollLeft === 0) {
      this._arrowLeft.classList.remove('ribbon__arrow_visible')
    } else {
      this._arrowLeft.classList.add('ribbon__arrow_visible')
    }

    if (scrollRight === 0 || scrollRight < 0) {
      this._arrowRight.classList.remove('ribbon__arrow_visible')
    } else {
      this._arrowRight.classList.add('ribbon__arrow_visible')
    }
  }

  _onClick = (target) => {
    const id = target.dataset.id;
    const click = new CustomEvent("ribbon-select", {
      detail: id,
      bubbles: true
    });
    this._element.dispatchEvent(click);
  };

  _addMarkup = () => {
   this._element = createElement(`
    <div class="ribbon">

    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
      ${this.categories.map((category) => `
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `).join('')}
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `)
  }

  _setEvtListeners = () => {
    this._arrowLeft.addEventListener('click', () => {this._inner.scrollBy(-350, 0)});
    this._inner.addEventListener('scroll', () => {this._checkVisability()});
    this._arrowRight.addEventListener('click', () => {this._inner.scrollBy(350, 0)});
    const categories = Array.from(this._element.querySelectorAll('.ribbon__item'));
    categories.forEach((category) => {
      category.addEventListener('click', (e) => {
        e.preventDefault();
        this._changeActiveCategory(e.target);
        this._onClick(e.target);
      })
    })
  }

  _changeActiveCategory = (target) => {
    const activeCategory = this._element.querySelector('.ribbon__item_active');
    if ((activeCategory !== null)) {
      activeCategory.classList.remove('ribbon__item_active');
    }
    target.classList.add('ribbon__item_active');
  }
}
