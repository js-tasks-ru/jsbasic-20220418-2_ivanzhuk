import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._element = null;
    this._addMarkup();
    this._setEvtListeners();
  }

  _addMarkup = () => {
    this._element = createElement(`
    <div class="modal">
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title"></h3>
      </div>

      <div class="modal__body"></div>
    </div>

  </div>
    `)
  }

  open = () => {
    document.body.classList.add('is-modal-open');
    document.body.append(this._element);
    document.addEventListener('keydown', this._handleEscClose);
  }

  setTitle = (title) => {
    this._element.querySelector('.modal__title').textContent = title;
  }

  setBody = (body) => {
    this._element.querySelector('.modal__body').append(body);
  }

  close = () => {
    this._element.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _setEvtListeners = () => {
    this._element.querySelector('.modal__close').addEventListener('click', () => {this.close()});
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
        this.close();
    }
};
}
