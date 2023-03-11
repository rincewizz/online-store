import { color, productHTMLElement, products } from "../types";
import * as noUiSlider from "nouislider";
class AppView {
  private productsEl: HTMLElement | null;
  private filtersEl: HTMLElement | null;
  private sortsEl: HTMLElement | null;

  constructor() {
    this.productsEl = document.querySelector(".products");
    this.filtersEl = document.querySelector(".filters");
    this.sortsEl = document.querySelector(".sorts");

    if (!this.productsEl || !this.filtersEl || !this.sortsEl)
      throw new Error("Error");

    const stockRange: noUiSlider.target | null =
      document.querySelector(".stock-range");
    const stockFrom: HTMLInputElement | null =
      document.querySelector("#stock-from");
    const stockTo: HTMLInputElement | null =
      document.querySelector("#stock-to");

    if (stockRange) {
      noUiSlider.create(stockRange, {
        start: [0, 50],
        step: 1,
        connect: true,
        range: {
          min: 0,
          max: 50,
        },
      });

      if (stockRange.noUiSlider && stockFrom && stockTo) {
        stockRange.noUiSlider.on("update", function (values, handle) {
          const value: number | string = values[handle];
          if (handle) {
            stockTo.value = String(Math.round(+value));
          } else {
            stockFrom.value = String(Math.round(+value));
          }
        });
      }
    }

    const yearRange: noUiSlider.target | null =
      document.querySelector(".year-range");
    const yearFrom: HTMLInputElement | null =
      document.querySelector("#year-from");
    const yearTo: HTMLInputElement | null = document.querySelector("#year-to");

    if (yearRange) {
      noUiSlider.create(yearRange, {
        start: [2015, 2022],
        step: 1,
        connect: true,
        range: {
          min: 2015,
          max: 2022,
        },
      });

      if (yearRange.noUiSlider && yearFrom && yearTo) {
        yearRange.noUiSlider.on("update", function (values, handle) {
          const value: number | string = values[handle];
          if (handle) {
            yearTo.value = String(Math.round(+value));
          } else {
            yearFrom.value = String(Math.round(+value));
          }
        });
      }
    }
  }
  renderProducts(products: products) {
    const productTemp: HTMLTemplateElement | null =
      document.querySelector("#productTemp");

    if (!productTemp) throw new Error("error");

    if (products.length === 0) {
      if (!document.querySelector(".products__noitem"))
        this.productsEl?.insertAdjacentHTML(
          "beforeend",
          `<div class="products__noitem">Извините, совпадений не обнаружено</div>`
        );
    } else {
      document.querySelector(".products__noitem")?.remove();
    }

    let tmpNode: HTMLElement | null = null;
    for (const [index, product] of products.entries()) {
      if (!product.element) {
        const productClone: productHTMLElement = productTemp.content
          .querySelector(".card")
          ?.cloneNode(true) as HTMLElement;

        const productImage: HTMLImageElement | null =
          productClone.querySelector(".card__img");
        const productTitle: HTMLElement | null =
          productClone.querySelector(".card__title");
        const productCount: HTMLElement | null =
          productClone.querySelector(".card__count-value");
        const productManufacturer: HTMLElement | null =
          productClone.querySelector(".card__manufacturer-value");
        const productYear: HTMLElement | null =
          productClone.querySelector(".card__year-value");
        const productColor: HTMLElement | null =
          productClone.querySelector(".card__color-value");
        const productDiagonal: HTMLElement | null = productClone.querySelector(
          ".card__diagonal-value"
        );
        const productPopular: HTMLElement | null =
          productClone.querySelector(".card__popular");
        const productAddToCart: HTMLElement | null =
          productClone.querySelector(".card__cart-btn");

        if (
          !productImage ||
          !productTitle ||
          !productCount ||
          !productManufacturer ||
          !productYear ||
          !productColor ||
          !productDiagonal ||
          !productPopular ||
          !productAddToCart
        ) {
          throw new Error("error");
        }

        productImage.src = product.image;
        productTitle.innerText = product.name;
        productCount.innerText = String(product.count);
        productManufacturer.innerText = product.manufacturer;
        productYear.innerText = String(product.year);
        productColor.innerText = color[product.color];
        productDiagonal.innerText = String(product.diagonal) + '"';

        product.element = productClone;
        productClone.productObj = product;
      }

      product.element.style.order = index.toString();

      if (product.isShow) {
        tmpNode = product.element;

        continue;
      }
      if (index === 0) {
        this.productsEl?.prepend(product.element);
        tmpNode = product.element;
      } else {
        tmpNode?.after(product.element);
        tmpNode = product.element;
      }
      product.isShow = true;
    }
  }
  getProductsEl(): HTMLElement | null {
    return this.productsEl;
  }
  changeCartBtn(productCardEl: productHTMLElement, mod: "remove" | "add") {
    const buttonEl: HTMLButtonElement | null =
      productCardEl.querySelector(".card__cart-btn");
    if (buttonEl) {
      if (mod === "add") {
        buttonEl.classList.add("card__cart-btn--remove");
        buttonEl.innerText = "Удалить из корзины";
      } else {
        buttonEl.classList.remove("card__cart-btn--remove");
        buttonEl.innerText = "Добавить в корзину";
      }
    }
  }
  updateCart(count: number) {
    const cartCountEl: HTMLElement | null =
      document.querySelector(".cart__count");
    if (cartCountEl) {
      cartCountEl.innerText = String(count);
      cartCountEl.style.visibility = count > 0 ? "visible" : "hidden";
    }
  }
  showMessage() {
    const messageEl: HTMLElement | null = document.querySelector(".message");
    if (messageEl) {
      messageEl.classList.add("message--show");
      setTimeout(() => {
        messageEl.classList.remove("message--show");
      }, 3000);
    }
  }
  clearFilters() {
    const valueFiltersCheckbox: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(".filter__checkbox, .filter__input-checkbox");
    valueFiltersCheckbox.forEach((el) => {
      if (el.checked == true) {
        el.click();
      }
    });

    const stockRange: noUiSlider.target | null =
      document.querySelector(".stock-range");
    if (stockRange && stockRange.noUiSlider) {
      stockRange.noUiSlider.reset();
    }

    const yearRange: noUiSlider.target | null =
      document.querySelector(".year-range");
    if (yearRange && yearRange.noUiSlider) {
      yearRange.noUiSlider.reset();
    }

    const searchEl: HTMLInputElement | null = document.querySelector(".search");
    if (searchEl) {
      searchEl.value = "";
      const event: Event = new Event("input", {
        bubbles: false,
        cancelable: true,
      });
      searchEl.dispatchEvent(event);
    }
  }
}

export default AppView;
module.exports = AppView;
