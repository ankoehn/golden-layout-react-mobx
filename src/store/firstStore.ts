import {observable, action} from "mobx";

export default class FirstStore {

  @observable public value: string = 'some value in ';

  @action
  public setValue(newValue: string) {
    this.value = newValue;
  }
}