import { products, ResponseProduct } from "../types";

import productsJson from "../../products/products.json";
import ProductModel from "./productModel";

class AppModel {
  private products: products;

  constructor() {
    this.products = [];
    const response: Array<ResponseProduct> = JSON.parse(
      productsJson as unknown as string
    );

    response.forEach((el, id) => {
      this.products.push(new ProductModel(el, id));
    });
  }
  getProducts(): products {
    console.log(this.products);
    return this.products;
  }
}

export default AppModel;
