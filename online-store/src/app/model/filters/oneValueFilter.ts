import { Product, products } from "../../types";

class OneValueFilter {
  private value: boolean;
  private productProperty: keyof Product;
  constructor(productProperty: keyof Product) {
    this.value = false;
    this.productProperty = productProperty;
  }
  set(val: boolean) {
    this.value = val;
  }
  get(): boolean {
    return this.value;
  }
  filter(products: products): products {
    if (this.value) {
      const filteredProducts: products = products.filter((el) => {
        if (this.value == el[this.productProperty]) {
          return true;
        } else {
          el.isShow = false;
          el.element?.remove();
          return;
        }
      });
      return filteredProducts;
    }
    return products;
  }
}

export default OneValueFilter;
