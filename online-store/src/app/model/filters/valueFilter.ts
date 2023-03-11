import { Product, products } from "../../types";

class ValueFilters<T extends Product[keyof Product]> {
  private values: Array<T>;
  private productProperty: keyof Product;

  constructor(productProperty: keyof Product) {
    this.values = [];
    this.productProperty = productProperty;
  }
  set(val: T, enabled: boolean) {
    if (!this.values.includes(val) && enabled) {
      this.values.push(val);
    }
    if (this.values.includes(val) && !enabled) {
      this.values = this.values.filter((el) => el != val);
    }
  }
  setValues(values: Array<T>) {
    this.values = values;
  }
  get(): Array<T> {
    return this.values;
  }
  filter(products: products): products {
    if (this.values.length) {
      const filteredProducts: products = products.filter((el) => {
        if (this.values.includes(el[this.productProperty] as T)) {
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

export default ValueFilters;
