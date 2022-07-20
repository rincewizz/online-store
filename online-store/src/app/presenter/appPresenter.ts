import AppModel from "../model/appModel";
import OneValueFilter from "../model/filters/oneValueFilter";
import ValueFilters from "../model/filters/valueFilter";
import AppView from "../view/appView";
import * as noUiSlider from "nouislider";
import RangeFilter from "../model/filters/rangeFilter";
import { Product, productHTMLElement } from "../types";

class AppPresenter {
  private model: AppModel;
  private view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;
  }
  async init() {
    await this.model.loadProducts();
    this.view.renderProducts(this.model.getProducts());

    const manufacturerFilterEl: HTMLElement | null = document.querySelector(
      ".filter--manufacturer"
    );
    if (manufacturerFilterEl) {
      const checkboxes: NodeListOf<HTMLInputElement> =
        manufacturerFilterEl.querySelectorAll(".filter__checkbox");
      const filter: ValueFilters<Product[keyof Product]> = this.model.filtersArr
        .manufacturer as ValueFilters<Product[keyof Product]>;
      checkboxes.forEach((el) => {
        if (filter.get().includes(el.value)) {
          el.checked = true;
        }
      });
      manufacturerFilterEl.addEventListener("change", (e) => {
        this.doManufacturerFilter(e);
      });
    }

    const diagonalFilterEl: HTMLElement | null =
      document.querySelector(".filter--diagonal");
    if (diagonalFilterEl) {
      const checkboxes: NodeListOf<HTMLInputElement> =
        diagonalFilterEl.querySelectorAll(".filter__checkbox");
      const filter: ValueFilters<Product[keyof Product]> = this.model.filtersArr
        .diagonal as ValueFilters<Product[keyof Product]>;
      checkboxes.forEach((el) => {
        if (filter.get().includes(+el.value)) {
          el.checked = true;
        }
      });

      diagonalFilterEl.addEventListener("input", (e) => {
        this.doDiagonalFilter(e);
      });
    }

    const colorFilterEl: HTMLElement | null =
      document.querySelector(".filter--color");
    if (colorFilterEl) {
      const checkboxes: NodeListOf<HTMLInputElement> =
        colorFilterEl.querySelectorAll(".filter__checkbox");
      const filter: ValueFilters<Product[keyof Product]> = this.model.filtersArr
        .color as ValueFilters<Product[keyof Product]>;
      checkboxes.forEach((el) => {
        if (filter.get().includes(el.value)) {
          el.checked = true;
        }
      });
      colorFilterEl.addEventListener("change", (e) => {
        this.doColorFilter(e);
      });
    }

    const popularFilterEl: HTMLElement | null =
      document.querySelector(".filter--popular");

    if (popularFilterEl) {
      const checkbox: HTMLInputElement | null = popularFilterEl.querySelector(
        ".filter__input-checkbox"
      );
      const filter: OneValueFilter = this.model.filtersArr
        .popular as OneValueFilter;
      if (filter.get() && checkbox) {
        checkbox.checked = true;
      }

      popularFilterEl.addEventListener("change", (e) => {
        this.doPopularFilter(e);
      });
    }

    const stockFilterEl: noUiSlider.target | null =
      document.querySelector(".stock-range");
    const stockFrom: HTMLInputElement | null =
      document.querySelector("#stock-from");
    const stockTo: HTMLInputElement | null =
      document.querySelector("#stock-to");

    if (stockFilterEl && stockFilterEl.noUiSlider && stockFrom && stockTo) {
      const filter: RangeFilter = this.model.filtersArr.stock as RangeFilter;
      stockFilterEl.noUiSlider.set([filter.get().from, filter.get().to]);

      stockFilterEl.noUiSlider.on("update", (values, handle) => {
        const value: string | number = values[handle];
        if (handle) {
          this.doStockFilter(Math.round(+value), "to");
        } else {
          this.doStockFilter(Math.round(+value), "from");
        }
      });
    }

    const yearFilterEl: noUiSlider.target | null =
      document.querySelector(".year-range");
    const yearFrom: HTMLInputElement | null =
      document.querySelector("#year-from");
    const yearTo: HTMLInputElement | null = document.querySelector("#year-to");

    if (yearFilterEl && yearFilterEl.noUiSlider && yearFrom && yearTo) {
      const filter: RangeFilter = this.model.filtersArr.year as RangeFilter;
      yearFilterEl.noUiSlider.set([filter.get().from, filter.get().to]);

      yearFilterEl.noUiSlider.on("update", (values, handle) => {
        const value: string | number = values[handle];
        if (handle) {
          this.doYearFilter(Math.round(+value), "to");
        } else {
          this.doYearFilter(Math.round(+value), "from");
        }
      });
    }

    const sortEl: HTMLSelectElement | null = document.querySelector(".sort");
    if (sortEl) {
      sortEl.value = `${this.model.sortOptions.sortBy}_${this.model.sortOptions.order}`;
      sortEl.addEventListener("change", (e) => {
        const target: HTMLSelectElement = e.target as HTMLSelectElement;
        this.model.sortOptions.sortBy = target.value.split("_")[0] as
          | "name"
          | "year"
          | "count";
        this.model.sortOptions.order = target.value.split("_")[1] as
          | "asc"
          | "desc";
        this.view.renderProducts(this.model.getProducts());
      });
    }

    const searchEl: HTMLInputElement | null = document.querySelector(".search");
    if (searchEl) {
      searchEl.value = this.model.searchQuery;
      searchEl.addEventListener("input", () => {
        this.model.searchQuery = searchEl.value;
        this.view.renderProducts(this.model.getProducts());
      });
    }

    const productsEl: HTMLElement | null = this.view.getProductsEl();
    if (productsEl) {
      productsEl.addEventListener("click", (e) => {
        const target: HTMLElement = e.target as HTMLElement;
        if (target.classList.contains("card__cart-btn")) {
          const productCardEl: productHTMLElement | null =
            target.closest(".card");

          if (productCardEl && productCardEl.productObj) {
            if (target.classList.contains("card__cart-btn--remove")) {
              this.removeFromCart(productCardEl.productObj);
            } else {
              this.addToCart(productCardEl.productObj);
            }
          }
        }
      });
    }

    const clearFiltersBtn: HTMLButtonElement | null = document.querySelector(
      ".clear-btn--filters"
    );
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        this.view.clearFilters();
      });
    }

    const clearCartsBtn: HTMLButtonElement | null =
      document.querySelector(".clear-btn--cart");
    if (clearCartsBtn) {
      clearCartsBtn.addEventListener("click", () => {
        this.clearCart();
      });
    }

    this.model.cart.forEach((el) => {
      if (el.element) this.view.changeCartBtn(el.element, "add");
    });
    this.view.updateCart(this.model.getCartCount());
  }
  doManufacturerFilter(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.classList.contains("filter__checkbox")) {
      const manufacturerFilter: ValueFilters<string> = this.model.filtersArr
        .manufacturer as ValueFilters<string>;
      manufacturerFilter.set(target.value, target.checked);
      this.view.renderProducts(this.model.getProducts());
    }
  }

  doDiagonalFilter(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.classList.contains("filter__checkbox")) {
      const diagonalFilter: ValueFilters<number> = this.model.filtersArr
        .diagonal as ValueFilters<number>;
      diagonalFilter.set(+target.value, target.checked);

      this.view.renderProducts(this.model.getProducts());
    }
  }

  doColorFilter(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.classList.contains("filter__checkbox")) {
      const colorFilter: ValueFilters<string> = this.model.filtersArr
        .color as ValueFilters<string>;
      colorFilter.set(target.value, target.checked);
      this.view.renderProducts(this.model.getProducts());
    }
  }
  doPopularFilter(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.classList.contains("filter__input-checkbox")) {
      const popularFilter: OneValueFilter = this.model.filtersArr
        .popular as OneValueFilter;
      popularFilter.set(Boolean(target.checked));
      this.view.renderProducts(this.model.getProducts());
    }
  }
  doStockFilter(val: number, pos: "from" | "to") {
    const stockFilter: RangeFilter = this.model.filtersArr.stock as RangeFilter;
    if (pos == "from") stockFilter.setFrom(val);
    if (pos == "to") stockFilter.setTo(val);
    this.view.renderProducts(this.model.getProducts());
  }
  doYearFilter(val: number, pos: "from" | "to") {
    const yearFilter: RangeFilter = this.model.filtersArr.year as RangeFilter;
    if (pos == "from") yearFilter.setFrom(val);
    if (pos == "to") yearFilter.setTo(val);

    this.view.renderProducts(this.model.getProducts());
  }
  addToCart(product: Product) {
    if (this.model.getCartCount() < 20) {
      this.model.addToCart(product);
      if (product.element) this.view.changeCartBtn(product.element, "add");
      this.view.updateCart(this.model.getCartCount());
    } else {
      this.view.showMessage();
    }
  }
  removeFromCart(product: Product) {
    this.model.removeFromCart(product);
    if (product.element) this.view.changeCartBtn(product.element, "remove");
    this.view.updateCart(this.model.getCartCount());
  }
  clearCart() {
    this.model.getProducts(true).forEach((el) => this.removeFromCart(el));
  }
}

export default AppPresenter;
