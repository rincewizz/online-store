import AppModel from "./model/appModel";
import AppPresenter from "./presenter/appPresenter";
import AppView from "./view/appView";

class App {
  private Model: AppModel;
  private View: AppView;
  private Presenter: AppPresenter;

  constructor() {
    this.Model = new AppModel();
    this.View = new AppView();
    this.Presenter = new AppPresenter(this.Model, this.View);

    this.start();
  }

  start() {
    this.Presenter.init();
  }
}

export default App;
