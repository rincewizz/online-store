import { color, productHTMLElement, products } from "../types";

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
  }
  renderProducts(products: products): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const productTemp: HTMLTemplateElement | null =
      document.querySelector("#productTemp");

    if (!productTemp) throw new Error("error");

    for (const product of products) {
      const productClone: productHTMLElement = productTemp.content.cloneNode(
        true
      ) as HTMLElement;

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
        productClone.querySelector(".card__add-to-cart");

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
      productDiagonal.innerText = String(product.diagonal);

      product.element = productClone;
      productClone.productObj = product;
      fragment.append(productClone);
    }
    if (this.productsEl) this.productsEl.innerHTML = "";
    this.productsEl?.append(fragment);
  }
}

export default AppView;
