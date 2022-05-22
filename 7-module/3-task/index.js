import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value;
    this.steps = steps;
    this._element = null;
    this._sliderSteps = null;
    this._slides = null;
    this._addMarkup();
    this._setEvtlisteners();
  }

  get elem() {
    return this._element;
  }

  _addMarkup = () => {
    this._element = createElement(`
    <div class="slider">

    <div class="slider__thumb">
      <span class="slider__value">0</span>
    </div>

    <div class="slider__progress"></div>

    <div class="slider__steps">
    </div>
  </div>
    `)

    this._sliderSteps = this._element.querySelector('.slider__steps');

    for(let i = 0; i < this.steps; i++) {
      const span = document.createElement('span');
      this._sliderSteps.append(span);
    }

    this._slides = Array.from(this._sliderSteps.children);

    this._setActiveSlide();
  }

  _setEvtlisteners = () => {
    this._element.addEventListener('click',(e) => {
      this._moveSlider(e);
      this._onClick();
    })
  }

  _moveSlider = (e) => {
    const sliderPercent = (e.clientX - this._element.getBoundingClientRect().left) / this._element.offsetWidth;
    const value = Math.round(sliderPercent * (this.steps - 1));
    this.value = value;
    this._element.querySelector('.slider__value').textContent = this.value;
    this._setActiveSlide();
  }

  _setActiveSlide = () => {
    const activeSlide = this._sliderSteps.querySelector('.slider__step-active');
    if (activeSlide !== null) {
      activeSlide.classList.remove('slider__step-active');
    }
    this._slides[this.value].classList.add('slider__step-active');
    const thumb = this._element.querySelector('.slider__thumb');
    const progress = this._element.querySelector('.slider__progress');

    const sliderPercent = (this.value / (this.steps - 1)) * 100;

    thumb.style.left = `${sliderPercent}%`;
    progress.style.width = `${sliderPercent}%`;
  }

  _onClick = () => {
    const click = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true
    });
    this._element.dispatchEvent(click);
  };
}
