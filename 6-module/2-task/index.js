export default class ProductCard {
  constructor(product) {
    this._product = product;
    this._element = document.createElement('div')
    this._addMarkup();
    this._setEventListeners();
  }

  get elem() {
    return this._element;
  }

  _addMarkup = () => {
    this._element.innerHTML =`
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${this._product.image}" class="card__image" alt="product">
        <span class="card__price">€${this._product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this._product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  `

  this._element.classList.add('card');
  }

  _onClick =  () => {
    const click = new CustomEvent('product-add', {
      bubbles: true,
      detail: this._product.id,
    });

    this._element.dispatchEvent(click);
  }

  _setEventListeners = () => {
    this._element.addEventListener('click', this._onClick)
  }
}
