import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.modal = null;
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product !== null && product !== undefined) {
      let productItem = {
        product: {},
        count: 0
      }

      let cart = this.cartItems.find((cart) => cart.product.id === product.id);
      if (cart) {
        this.cartItems.map((item) => {
          if (item.product.id === cart.product.id) {
            item.count += 1;
            productItem = item;
          }
        });
      } else {
        productItem = {
          product: product,
          count: 1
        };

        this.cartItems.push(productItem);
      }
      this.onProductUpdate(this.productItem);
    } else {
      return;
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.map((productItem => {
      if (productItem.product.id === productId) {
        productItem.count += amount;
        this.cartItem = productItem;
        if (productItem.count === 0) {
          this.cartItems = this.cartItems.filter((productItem) => productItem.product.id !== productId);
        }
      }
    }));

    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let sum = 0;
    this.cartItems.forEach((productItem) => {sum += productItem.count});
    return sum;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.forEach((productItem) => {price += productItem.product.price * productItem.count});
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    const container = document.createElement('div')

    this.cartItems.forEach((item) => {container.append(this.renderProduct(item.product, item.count))});
    container.append(this.renderOrderForm());

    this.modal.setBody(container);
    const minus = Array.from(container.querySelectorAll('.cart-counter__button_minus'));
    const plus = Array.from(container.querySelectorAll('.cart-counter__button_plus'));

    minus.forEach((button)=> {
      button.addEventListener('click', (e) => {
        const productId = e.target.closest('div[data-product-id]').getAttribute('data-product-id');
        this.updateProductCount(productId, -1);
      });
    });


    plus.map((button)=> {
      button.addEventListener('click', (e) => {
        const productId = e.target.closest('div[data-product-id]').getAttribute('data-product-id');
        this.updateProductCount(productId, 1);
      });
    });

    const form = container.querySelector('.cart-form');
    form.addEventListener('submit', this.onSubmit);
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    const modalOpened = document.querySelector('.is-modal-open');
    if (modalOpened) {
      const modalElement = document.querySelector('.modal');
      const isEmpty = this.isEmpty();
      if (!isEmpty) {
        const productId = cartItem.product.id;
        if (cartItem.count > 0) {
          const productSum = modalElement.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
          const productPrice = modalElement.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
          const resultPrice = modalElement.querySelector(`.cart-buttons__info-price`);
          productSum.textContent = cartItem.count;
          productPrice.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
          resultPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
        } else {
          modalElement.querySelector(`[data-product-id="${productId}"]`).remove();
        }
      } else {
        this.modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const modalElement = document.querySelector('.modal');
    const submitButton = modalElement.querySelector('.cart-buttons__button');
    submitButton.classList.add('is-loading');
    const form = modalElement.querySelector('.cart-form');

    const request = () => {
      return fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(form),
    })};

    request()
      .then(() => {
        submitButton.classList.remove('is-loading');
        this.modal.setTitle('Success!');
        this.cartItems = [];
        this.modal.setBody(createElement( `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>`)
        );
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

