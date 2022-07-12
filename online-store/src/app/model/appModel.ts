import { products, ResponseProduct, Product } from "../types";

import productsJson from "../../products/products.json";
import ProductModel from "./productModel";
import ValueFilters from "./filters/valueFilter";
import OneValueFilter from "./filters/oneValueFilter";
import RangeFilter from "./filters/rangeFilter";

class AppModel {
  private products: products;
  public filtersArr: {
    [key: string]:
      | ValueFilters<Product[keyof Product]>
      | OneValueFilter
      | RangeFilter;
  };

  constructor() {
    this.products = [];

    this.filtersArr = {
      manufacturer: new ValueFilters("manufacturer"),
      diagonal: new ValueFilters("diagonal"),
      color: new ValueFilters("color"),
      popular: new OneValueFilter("popular"),
      stock: new RangeFilter("count"),
      year: new RangeFilter("year"),
    };

    const response: Array<ResponseProduct> = JSON.parse(
      productsJson as unknown as string
    );

    response.forEach((el, id) => {
      this.products.push(new ProductModel(el, id));
    });
  }
  getProducts(): products {
    let filteredProducts: products = this.products;

    filteredProducts = this.filtersArr["manufacturer"].filter(filteredProducts);
    filteredProducts = this.filtersArr["diagonal"].filter(filteredProducts);
    filteredProducts = this.filtersArr["color"].filter(filteredProducts);

    filteredProducts = this.filtersArr["popular"].filter(filteredProducts);

    filteredProducts = this.filtersArr["stock"].filter(filteredProducts);
    filteredProducts = this.filtersArr["year"].filter(filteredProducts);

    return filteredProducts;
  }
}

export default AppModel;
