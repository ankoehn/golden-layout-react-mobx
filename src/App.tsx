import * as React from "react";
import {Provider} from "mobx-react";
import {GoldenLayoutComponent} from "./components/goldenlayout/GoldenLayoutComponent";
import {FirstGoldenPanel} from "./components/FirstGoldenPanel";
import {SecondGoldenPanel} from "./components/SecondGoldenPanel";
import store from "./store/";

const styles = {
  goldenLayout: {height: "99vh"}
};

interface IAppState {
  contextValue: string;
}

export default class App extends React.Component<any, IAppState> {
  public state = {contextValue: "default value"};

  private registerComponents = myLayout => {
    myLayout.registerComponent("firstItem", FirstGoldenPanel);
    myLayout.registerComponent("secondItem", SecondGoldenPanel);
  };

  public render() {
    return (
      <Provider {...this.props}>
        <GoldenLayoutComponent // config from simple react example: https://golden-layout.com/examples/#qZXEyv
          htmlAttrs={{style: styles.goldenLayout}}
          config={{
            settings: {
              showPopoutIcon: false // disable popout function
            },
            content: [
              {
                content: [
                  {
                    component: "firstItem",
                    props: {...store},
                    title: "A react component",
                    type: "react-component"
                  },
                  {
                    component: "secondItem",
                    props: {...store},
                    title: "Another react component",
                    type: "react-component",
                  }],
                type: "row"
              }
            ]
          }}
          registerComponents={this.registerComponents}
        />
      </Provider>
    );
  }
}