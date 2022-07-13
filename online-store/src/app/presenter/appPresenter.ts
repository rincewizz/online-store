import AppModel from "../model/appModel";
import OneValueFilter from "../model/filters/oneValueFilter";
import ValueFilters from "../model/filters/valueFilter";
import AppView from "../view/appView";
import * as noUiSlider from "nouislider";
import RangeFilter from "../model/filters/rangeFilter";

class AppPresenter {
  private model: AppModel;
  private view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;
  }
  init() {
    this.view.renderProducts(this.model.getProducts());

    const manufacturerFilterEl: HTMLElement | null = document.querySelector(
      ".filter--manufacturer"
    );
    if (manufacturerFilterEl) {
      manufacturerFilterEl.addEventListener("change", (e) => {
        this.doManufacturerFilter(e);
      });
    }

    const diagonalFilterEl: HTMLElement | null =
      document.querySelector(".filter--diagonal");
    if (diagonalFilterEl) {
      diagonalFilterEl.addEventListener("change", (e) => {
        this.doDiagonalFilter(e);
      });
    }

    const colorFilterEl: HTMLElement | null =
      document.querySelector(".filter--color");
    if (colorFilterEl) {
      colorFilterEl.addEventListener("change", (e) => {
        this.doColorFilter(e);
      });
    }

    const popularFilterEl: HTMLElement | null =
      document.querySelector(".filter--popular");
    if (popularFilterEl) {
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
      stockFilterEl.noUiSlider.on("update", (values, handle) => {
        const value = values[handle];
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
      yearFilterEl.noUiSlider.on("update", (values, handle) => {
        const value = values[handle];
        if (handle) {
          this.doYearFilter(Math.round(+value), "to");
        } else {
          this.doYearFilter(Math.round(+value), "from");
        }
      });
    }

    const sortEl: HTMLSelectElement | null = document.querySelector(".sort");
    if (sortEl) {
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
      searchEl.addEventListener("input", () => {
        this.model.searchQuery = searchEl.value;
        this.view.renderProducts(this.model.getProducts());
      });
    }
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
}

export default AppPresenter;
