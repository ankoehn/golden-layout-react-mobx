import FirstStore from './firstStore'
import SecondStore from './secondStore'
import GoldenLayoutStore from './goldenlayoutStore'

class AppStore {

  public firstStore: FirstStore;
  public secondStore: FirstStore;
  public goldenlayoutStore: GoldenLayoutStore;

  constructor() {
    this.firstStore = new FirstStore();
    this.secondStore = new SecondStore();
    this.goldenlayoutStore = new GoldenLayoutStore();
  }
}

/** Export an singleton instance of the AppStore */
const store = new AppStore();

export default store;