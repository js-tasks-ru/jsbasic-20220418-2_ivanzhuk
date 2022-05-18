import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this._slides = slides;
    this._element = document.createElement('div');
    this._addMarkup();
    this._arrowRight = this._element.querySelector('.carousel__arrow_right');
    this._arrowLeft = this._element.querySelector('.carousel__arrow_left');
    this._inner = this._element.querySelector('.carousel__inner');
    this._currentPos = 0;
    this._buttons = Array.from(this._element.querySelector('.carousel__inner').querySelectorAll('.carousel__button'));
    this._setEventListeners();
    this._setButtons();
  }

  get elem() {
    return this._element;
  }

  _slideRight = () => {
    this._currentPos +=1;
    this._inner.style.transform = `translateX(-${this._inner.offsetWidth * (this._currentPos)}px)`;
    this._checkButtons();
  }

  _slideLeft = () => {
    this._currentPos -=1;
    this._inner.style.transform = `translateX(-${this._inner.offsetWidth * (this._currentPos)}px)`;
    this._checkButtons();
  }

  _checkButtons = () => {
    if (this._currentPos === 0) {
      this._arrowLeft.style.display = 'none';
    } else {
      this._arrowLeft.style.display = '';
    }

    if (this._currentPos === this._slides.length - 1) {
      this._arrowRight.style.display = 'none';
    } else {
      this._arrowRight.style.display = '';
    }
  }

  _onClick = (id) => {
    const click = new CustomEvent("product-add", {
      detail: id,
      bubbles: true,
    });
    this._element.dispatchEvent(click);
  };

  _setButtons = () => {
    this._buttons.forEach((button) => {
      const id = button.parentElement.parentElement.dataset.id;
      button.addEventListener('click', () => {
        this._onClick(id);
      })
    })
  }

  _setEventListeners = () => {
    this._arrowRight.addEventListener('click', this._slideRight);
    this._arrowLeft.addEventListener('click', this._slideLeft);
    this._checkButtons();
  }

  _addMarkup = () => {
    this._element.classList.add('carousel')

    this._element.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this._slides.map((element) => `
          <div class="carousel__slide" data-id="${element.id}">
            <img src="/assets/images/carousel/${element.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${element.price.toFixed(2)}</span>
              <div class="carousel__title">${element.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `
  }

}
