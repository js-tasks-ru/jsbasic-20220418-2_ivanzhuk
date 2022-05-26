import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.element = null;
    this.noNuts = false;
    this.vegeterianOnly = false;
    this.maxSpiciness = 4;
    this.category = '';
    this.createMarkup();
  }

  createMarkup = () => {
    this.element = createElement(`<div class="products-grid">
    <div class="products-grid__inner">

    </div>
  </div>`)

    const container = this.element.querySelector('.products-grid__inner');
      this.products.forEach((product) => {
        const card = new ProductCard(product);
        container.append(card.elem);
      })
  }

  get elem() {
    return this.element
  }

  updateFilter(filters) {
    const filter = `${Object.keys(filters)}`;
    this[filter] = filters[filter];
    const container = this.element.querySelector('.products-grid__inner');
    container.innerHTML = '';
    this.products.forEach((product) => {
      let add = true;

      if (product.nuts && this.noNuts) {
        add = false;
      }
      if (!product.vegeterian && this.vegeterianOnly) {
        add = false;
      }
      if (product.spiciness > this.maxSpiciness) {
        add = false;
      }
      if (this.category && this.category !== product.category) {
        add = false;
      }

      if (add) {
        const card = new ProductCard(product);
        container.append(card.elem);
      }
    })
  }
}
