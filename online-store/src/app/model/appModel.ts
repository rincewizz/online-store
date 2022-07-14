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
  public sortOptions: {
    sortBy: "name" | "year" | "count";
    order: "asc" | "desc";
  };
  public searchQuery: string;
  public cart: products;
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
    this.sortOptions = { sortBy: "name", order: "asc" };
    this.searchQuery = "";

    const response: Array<ResponseProduct> = JSON.parse(
      productsJson as unknown as string
    );

    response.forEach((el, id) => {
      this.products.push(new ProductModel(el, id));
    });

    this.cart = [];
  }
  getProducts(): products {
    let filteredProducts: products = this.products;

    filteredProducts = this.sort(
      filteredProducts,
      this.sortOptions.sortBy,
      this.sortOptions.order
    );

    filteredProducts = this.filtersArr["manufacturer"].filter(filteredProducts);
    filteredProducts = this.filtersArr["diagonal"].filter(filteredProducts);
    filteredProducts = this.filtersArr["color"].filter(filteredProducts);

    filteredProducts = this.filtersArr["popular"].filter(filteredProducts);

    filteredProducts = this.filtersArr["stock"].filter(filteredProducts);
    filteredProducts = this.filtersArr["year"].filter(filteredProducts);

    filteredProducts = this.search(filteredProducts, this.searchQuery);

    return filteredProducts;
  }
  sort(
    products: products,
    sortBy: "name" | "year" | "count",
    order: "asc" | "desc"
  ): products {
    const oroderMod: number = order === "asc" ? 1 : -1;
    switch (sortBy) {
      case "name":
        products = products.sort((a, b) => {
          if (a.name > b.name) return 1 * oroderMod;
          if (a.name < b.name) return -1 * oroderMod;
          return 0;
        });
        break;
      case "year":
        products = products.sort((a, b) => {
          if (a.year > b.year) return 1 * oroderMod;
          if (a.year < b.year) return -1 * oroderMod;
          return 0;
        });
        break;
      case "count":
        products = products.sort((a, b) => {
          if (a.count > b.count) return 1 * oroderMod;
          if (a.count < b.count) return -1 * oroderMod;
          return 0;
        });
        break;
    }
    // products.forEach((el) => el.element?.remove());
    return products;
  }

  search(products: products, query: string): products {
    if (query) {
      const regexp = new RegExp(query, "i");
      return products.filter((el) => {
        if (el.name.search(regexp) !== -1) {
          return true;
        } else {
          el.isShow = false;
          el.element?.remove();
          return false;
        }
      });
    }
    return products;
  }
  addToCart(product: Product) {
    if (!this.cart.includes(product) && this.getCartCount() < 20) {
      this.cart.push(product);
    }
  }
  removeFromCart(product: Product) {
    const index: number = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }
  getCartCount(): number {
    return this.cart.length;
  }
}

export default AppModel;
