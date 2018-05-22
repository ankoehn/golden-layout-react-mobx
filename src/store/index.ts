import FirstStore from './firstStore'
import SecondStore from './secondStore'

class AppStore {

  public firstStore: FirstStore;
  public secondStore: FirstStore;

  constructor() {
    this.firstStore = new FirstStore();
    this.secondStore = new SecondStore();
  }


}

/** Export an singleton instance of the AppStore */
const store = new AppStore();

export default store;
