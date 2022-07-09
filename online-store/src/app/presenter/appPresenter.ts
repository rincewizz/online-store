import AppModel from "../model/appModel";
import AppView from "../view/appView";

class AppPresenter {
  private model: AppModel;
  private view: AppView;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;
  }
  init() {
    this.view.renderProducts(this.model.getProducts());
  }
}

export default AppPresenter;
