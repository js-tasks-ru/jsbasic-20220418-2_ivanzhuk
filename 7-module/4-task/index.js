import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0}) {
    this.value = value;
    this.steps = steps;
    this._element = null;
    this._sliderSteps = null;
    this._slides = null;
    this._thumb = null;
    this._progress = null;
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
      <span class="slider__value">${this.value}</span>
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
    this._thumb = this._element.querySelector('.slider__thumb');
    this._progress = this._element.querySelector('.slider__progress');

    this._setActiveSlide();
  }

  _setEvtlisteners = () => {
    this._element.addEventListener('click',(e) => {
      this._moveSlider(e);
    })
    this._thumb.ondragstart = () => false;
    this._thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this._element.classList.add('slider_dragging');
      document.addEventListener('pointermove', this._onMove);
      document.addEventListener('pointerup', this._onDragEnd);
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

    const sliderPercent = (this.value / (this.steps - 1)) * 100;

    this._thumb.style.left = `${sliderPercent}%`;
    this._progress.style.width = `${sliderPercent}%`;
    this._onClick();
  }

  _onClick = () => {
    const click = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true
    });
    this._element.dispatchEvent(click);
  };

  _onMove = (e) => {
    e.preventDefault();
    const sliderPercent = (e.clientX - this._element.getBoundingClientRect().left) / this._element.offsetWidth;
    let resultPercent;
    if (sliderPercent < 0) {
      resultPercent = 0;
    } else if (sliderPercent > 1) {
      resultPercent = 1;
    } else { resultPercent = sliderPercent }
    this._thumb.style.left = `${resultPercent * 100}%`;
    this._progress.style.width = `${resultPercent * 100}%`;

    const value = Math.round(resultPercent * (this.steps - 1));
    this.value = value;
    this._element.querySelector('.slider__value').textContent = this.value;

  }

  _onDragEnd = () => {
    this._setActiveSlide();
    this._element.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this._onMove);
    document.removeEventListener('pointerup', this._onDragEnd);
  }
}
