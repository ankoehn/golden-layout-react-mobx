import * as React from "react";
import {Provider} from "mobx-react";
import {GoldenLayoutComponent} from "./components/goldenlayout/GoldenLayoutComponent";
import {FirstGoldenPanel} from "./components/FirstGoldenPanel";
import {SecondGoldenPanel} from "./components/SecondGoldenPanel";
import store from "./store/";

interface IAppState {
  contextValue: string;
}

export default class App extends React.Component<any, IAppState> {

  private registerComponents = myLayout => {
    myLayout.registerComponent("firstItem", FirstGoldenPanel);
    myLayout.registerComponent("secondItem", SecondGoldenPanel);
  };

  public render() {
    return (
      <Provider {...this.props}>
        <GoldenLayoutComponent registerComponents={this.registerComponents}
        />
      </Provider>
    );
  }
}