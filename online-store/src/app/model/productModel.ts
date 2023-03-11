import { Product, productHTMLElement, ResponseProduct } from "../types";

class ProductModel implements Product {
  id: number;
  name: string;
  image: string;
  count: number;
  year: number;
  color: "red" | "green" | "white" | "black";
  manufacturer: "PocketBook" | "Amazon" | "Onyx";
  diagonal: number;
  popular: boolean;
  isShow: boolean;
  element: productHTMLElement | null;

  constructor(product: ResponseProduct, id: number) {
    this.id = id;
    this.name = product.name;
    this.image = product.image;
    this.count = product.count;
    this.year = product.year;
    this.color = product.color;
    this.manufacturer = product.manufacturer;
    this.diagonal = product.diagonal;
    this.popular = product.popular;
    this.isShow = false;
    this.element = null;
  }
}

export default ProductModel;
