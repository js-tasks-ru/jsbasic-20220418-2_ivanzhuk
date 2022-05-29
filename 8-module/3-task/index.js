export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product !== null && product !== undefined) {
      let productItem = {
        product: {},
        count: 0
      }

      let cart = this.cartItems.find((cart) => cart.product.id === product.id);
      if (cart) {
        this.cartItems.forEach((item) => {
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
    this.cartItems.forEach((productItem => {
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

