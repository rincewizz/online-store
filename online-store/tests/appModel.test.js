const AppModel = require("../src/app/model/appModel");

const response = require("../src/products/products.json");

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

global.fetch = jest.fn(() => {
  return {
    json: () => response,
  }
});

let model;
let products;

beforeAll( async () => {
  model = new AppModel();
  jest.spyOn(model, 'saveSettings').mockImplementation(() => {});
  await model.loadProducts();
  products = model.getProducts(true);
});

describe("addToCart()", () => {

  test("adding to cart", () => {
    model.addToCart(products[6]);
    expect(model.cart[0]).toEqual(products[6]);
  });

  test("cart limit of 20 products", () => {
    products.forEach(el => {
      model.addToCart(el);
    });
    
    expect(model.cart.length).toEqual(20);
  });
});

describe("getCartCount()", () => {

  test("get count of products in the cart", () => {
    model.cart = [];
    model.addToCart(products[0]);
    model.addToCart(products[1]);
    model.addToCart(products[3]);
    expect(model.getCartCount()).toEqual(3);
  });
});

describe("search()", () => {

  test("correct count of returned search results", () => {
    expect(model.search(products, "plus").length).toEqual(2);
  });

  test("correct return of search results", () => {
    expect(model.search(products, "kids")[0].name).toEqual("Amazon Kindle Paperwhite Kids");
  });

});

describe("sort()", () => {

  test("correct sorting", () => {
    expect(model.sort(products, "year", "asc")[0].year).toEqual(2015);
  });

});

describe("removeFromCart()", () => {

  test("delet an existing product from the cart", async () => {
    model.search(products, "")
    model.cart = [];
    model.addToCart(products[0]);
    model.addToCart(products[3]);
    model.addToCart(products[5]);
    model.addToCart(products[8]);
    model.addToCart(products[15]);
    model.removeFromCart(products[5]);
    expect(model.cart.length).toEqual(4); 
  });

  test("delet an non-existing product from the cart", async () => {
    model.search(products, "")
    model.cart = [];
    model.addToCart(products[0]);
    model.addToCart(products[3]);
    model.addToCart(products[5]);
    model.addToCart(products[8]);
    model.addToCart(products[15]);
    model.removeFromCart(products[10])
    expect(model.cart.length).toEqual(5);
  });

  test("result after deleting product from cart", async () => {
    model.search(products, "")
    model.cart = [];
    model.addToCart(products[0]);
    model.addToCart(products[3]);
    model.addToCart(products[5]);
    model.addToCart(products[8]);
    model.addToCart(products[15]);
    model.removeFromCart(products[5])
    expect(model.cart).toEqual([products[0], products[3], products[8], products[15]]);
  });

});
