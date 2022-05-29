import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.element = null;
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
    this.filters = Object.assign(this.filters, filters);
    const container = this.element.querySelector('.products-grid__inner');
    container.innerHTML = '';
    this.products.forEach((product) => {
      let add = true;

      if (product.nuts && this.filters.noNuts) {
        add = false;
      }
      if (!product.vegeterian && this.filters.vegeterianOnly) {
        add = false;
      }
      if (product.spiciness > this.filters.maxSpiciness) {
        add = false;
      }
      if (this.filters.category && this.filters.category !== product.category) {
        add = false;
      }

      if (add) {
        const card = new ProductCard(product);
        container.append(card.elem);
      }
    })
  }
}
