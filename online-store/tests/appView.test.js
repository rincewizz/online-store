/**
 * @jest-environment jsdom
 */

const AppModel = require("../src/app/model/appModel");
const AppView = require("../src/app/view/appView");

const response = require("../src/products/products.json");
const { html } = require("./variables");

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
let view;
let products;

beforeAll( async () => {

  document.body.innerHTML = html;

  model = new AppModel();
  view = new AppView();
  jest.spyOn(model, 'saveSettings').mockImplementation(() => {});
  await model.loadProducts();
  products = model.getProducts(true);

});

describe("updateCart()", () => {

  test("display the number of products in the cart", () => {
    view.updateCart(10);
    const cartCount = document.querySelector(".cart__count");
    expect(cartCount.innerText).toEqual("10");
    expect(cartCount.style.visibility).toEqual("visible");
  });
  
  test("hide the counter if the cart is empty", () => {
    view.updateCart(0);
    const cartCount = document.querySelector(".cart__count");
    expect(cartCount.style.visibility).toEqual("hidden");
  });
    
});

describe("showMessage()", () => {

  test("show message", () => {
    const message = document.querySelector(".message");
    view.showMessage();
    expect(message.classList.contains("message--show")).toEqual(true);
  });
      
});
  