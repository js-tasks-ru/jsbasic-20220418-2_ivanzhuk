import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    const carouselContainer = document.querySelector('.container[data-carousel-holder]');
    const ribbonContainer = document.querySelector('div[data-ribbon-holder]');
    const sliderContainer = document.querySelector('div[data-slider-holder]');
    const cartIconContainer = document.querySelector('div[data-cart-icon-holder]');
    const productsGridContainer = document.querySelector('div[data-products-grid-holder]');

    this.carousel = new Carousel(slides);
    this.ribbon = new RibbonMenu(categories);
    this.slider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    this.carouselElement = this.carousel.elem;
    this.ribbonElement = this.ribbon.elem;
    this.sliderElement = this.slider.elem;
    this.cartIconElement = this.cartIcon.elem;
    this.noNutsCheckbox = document.getElementById('nuts-checkbox');
    this.vegetarianCheckbox = document.getElementById('vegeterian-checkbox');

    carouselContainer.append(this.carouselElement);
    ribbonContainer.append(this.ribbonElement);
    sliderContainer.append(this.sliderElement);
    cartIconContainer.append(this.cartIconElement);

    const data = await this._apiRequest();
    this._addProducts(productsGridContainer, data);

    this._addEventListeners(data);
    this._updateFilter();
  }

  _apiRequest = () => {
    return fetch('products.json')
    .then((res) => res.json())
    .catch((err) => {console.log(err)})
  }

  _addProducts = (container, data) => {
    container.innerHTML = '';
    this.productsGrid = new ProductsGrid(data);
    container.append(this.productsGrid.elem);
  }

  _updateFilter = () => {
    this.productsGrid.updateFilter({
      noNuts: this.noNutsCheckbox.checked,
      vegeterianOnly: this.vegetarianCheckbox.checked,
      maxSpiciness: this.slider.value,
      category: this.ribbon.value
    });
  }

  _addEventListeners = (data) => {

    document.body.addEventListener('product-add', (e) => {
      const currentProduct = data.find(product => product.id === e.detail);
      this.cart.addProduct(currentProduct);
    })

    this.sliderElement.addEventListener('slider-change', (e) => {
      this.productsGrid.updateFilter({maxSpiciness: e.detail});
    })

    this.ribbonElement.addEventListener('ribbon-select', (e) => {
      this.productsGrid.updateFilter({category: e.detail});
    })

    this.noNutsCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({noNuts: this.noNutsCheckbox.checked})
    })

    this.vegetarianCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({vegeterianOnly: this.vegetarianCheckbox.checked})
    })
  }
}
