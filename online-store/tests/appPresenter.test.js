/**
 * @jest-environment jsdom
 */

const AppModel = require("../src/app/model/appModel");
const AppView = require("../src/app/view/appView");
const AppPresenter = require("../src/app/presenter/appPresenter");

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
let presenter;
let products;

beforeAll( async () => {

  document.body.innerHTML = html;
  model = new AppModel();
  view = new AppView();
  jest.spyOn(model, 'saveSettings').mockImplementation(() => {});
  await model.loadProducts();
  products = model.getProducts(true);

  presenter = new AppPresenter(model, view);

});

describe("clearCart()", () => {

  test("clear cart", () => {
    jest.spyOn(model, 'removeFromCart').mockImplementation(() => {});

    presenter.clearCart();
    expect(model.removeFromCart).toHaveBeenCalledTimes(products.length);
  });
    
});
 
 
describe("removeFromCart()", () => {

  test("remove product from cart", () => {
    jest.spyOn(model, 'removeFromCart').mockImplementation(() => {});
    jest.spyOn(view, 'changeCartBtn').mockImplementation(() => {});
    jest.spyOn(view, 'updateCart').mockImplementation(() => {});
    
    model.cart = [];
    products[10].element = true;
    model.addToCart(products[10]);

    presenter.removeFromCart(products[10]);
    expect(model.removeFromCart).toHaveBeenCalled();
    expect(view.changeCartBtn).toHaveBeenCalled();
    expect(view.updateCart).toHaveBeenCalled();
  });
    
});
 
describe("addToCart()", () => {
 
  afterEach(() => {    
    jest.clearAllMocks();
  });

  test("add product to cart", () => {
    jest.spyOn(model, 'getCartCount').mockImplementation(() => 10);
    jest.spyOn(model, 'addToCart').mockImplementation(() => {});
    jest.spyOn(view, 'changeCartBtn').mockImplementation(() => {});
    jest.spyOn(view, 'updateCart').mockImplementation(() => {});

    products[10].element = true;

    presenter.addToCart(products[10]);
    expect(model.getCartCount).toHaveBeenCalled();
    expect(model.addToCart).toHaveBeenCalled();
    expect(view.changeCartBtn).toHaveBeenCalled();
    expect(view.updateCart).toHaveBeenCalled();
  });

  test("not add to cart and show message if the cart has 20 products", () => {
    jest.spyOn(model, 'getCartCount').mockImplementation(() => 20);
    jest.spyOn(view, 'showMessage').mockImplementation(() => {});
    jest.spyOn(model, 'addToCart').mockImplementation(() => {});
    jest.spyOn(view, 'changeCartBtn').mockImplementation(() => {});
    jest.spyOn(view, 'updateCart').mockImplementation(() => {});

    presenter.addToCart(products[20]);
    expect(model.getCartCount).toHaveBeenCalled();
    expect(model.addToCart).not.toHaveBeenCalled();
    expect(view.changeCartBtn).not.toHaveBeenCalled();
    expect(view.updateCart).not.toHaveBeenCalled();
    expect(view.showMessage).toHaveBeenCalled();
  });
      
});
 