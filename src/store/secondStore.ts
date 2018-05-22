import {observable, action} from "mobx";

export default class SecondStore {

  @observable public value: string = 'some value in ';

  @action
  public setValue(newValue: string) {
    this.value = newValue;
  }
}