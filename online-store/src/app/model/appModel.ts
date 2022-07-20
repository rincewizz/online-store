import {
  products,
  ResponseProduct,
  Product,
  Search,
  Settings,
  color,
  RangeFilterType,
} from "../types";

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
  public sortOptions: Search;
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

    this.cart = [];
  }
  async loadProducts() {
    const response: Array<ResponseProduct> = await (
      await fetch(productsJson as unknown as URL)
    ).json();

    response.forEach((el, id) => {
      this.products.push(new ProductModel(el, id));
    });
    this.loadSettings();
  }
  loadSettings() {
    const settingsJSON: string | null = localStorage.getItem("settings");
    if (settingsJSON) {
      const settings: Settings = JSON.parse(settingsJSON);
      (
        this.filtersArr.manufacturer as ValueFilters<Product[keyof Product]>
      ).setValues(settings.filters.manufacturer);
      (
        this.filtersArr.diagonal as ValueFilters<Product[keyof Product]>
      ).setValues(settings.filters.diagonal);
      (this.filtersArr.color as ValueFilters<Product[keyof Product]>).setValues(
        settings.filters.color as color[]
      );
      (this.filtersArr.popular as OneValueFilter).set(settings.filters.popular);
      (this.filtersArr.stock as RangeFilter).set(settings.filters.stock);
      (this.filtersArr.year as RangeFilter).set(settings.filters.year);
      this.sortOptions = settings.sort;
      this.searchQuery = settings.search;
      this.cart = this.products.filter((el) => settings.cart.includes(el.id));
    }
  }
  saveSettings() {
    const settings: Settings = {
      filters: {
        manufacturer: this.filtersArr.manufacturer.get() as string[],
        diagonal: this.filtersArr.diagonal.get() as number[],
        color: this.filtersArr.color.get() as string[],
        popular: this.filtersArr.popular.get() as boolean,
        stock: this.filtersArr.stock.get() as RangeFilterType,
        year: this.filtersArr.year.get() as RangeFilterType,
      },
      sort: this.sortOptions,
      search: this.searchQuery,
      cart: this.cart.map((el) => el.id),
    };
    localStorage.setItem("settings", JSON.stringify(settings));
  }
  getProducts(all = false): products {
    if (all) return this.products;

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

    this.saveSettings();

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
      this.saveSettings();
    }
  }
  removeFromCart(product: Product) {
    const index: number = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveSettings();
    }
  }
  getCartCount(): number {
    return this.cart.length;
  }
}

export default AppModel;
