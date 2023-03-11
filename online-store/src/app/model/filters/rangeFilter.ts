import { Product, products, RangeFilterType } from "../../types";

class RangeFilter {
  private value: RangeFilterType;
  private productProperty: keyof Product;
  constructor(productProperty: keyof Product) {
    this.value = { from: -Infinity, to: Infinity };
    this.productProperty = productProperty;
  }
  set(val: RangeFilterType) {
    this.value = val;
  }
  get(): RangeFilterType {
    return this.value;
  }
  setFrom(val: number) {
    this.value.from = val;
  }
  setTo(val: number) {
    this.value.to = val;
  }
  filter(products: products): products {
    if (this.value) {
      const filteredProducts: products = products.filter((el) => {
        if (
          el[this.productProperty] !== null &&
          this.value.from <= Number(el[this.productProperty]) &&
          this.value.to >= Number(el[this.productProperty])
        ) {
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

export default RangeFilter;
