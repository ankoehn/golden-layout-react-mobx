import * as React from "react";
import * as ReactDOM from "react-dom";
import * as GoldenLayout from "golden-layout";
import {inject, observer} from "mobx-react";
import GoldenlayoutStore from '../../store/goldenlayoutStore'
import "./goldenLayoutDependencies";
import "./patchReactComponentHandler";
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";

const styles = {
  component: {
    height:"99vh"
  },
};

interface IGoldenLayoutComponentProps {
  goldenlayoutStore?: GoldenlayoutStore;
  registerComponents: (layout: any) => void;
}

interface IGoldenLayoutComponentState {
  renderPanels: any;
}

@inject('goldenlayoutStore')
@observer
export class GoldenLayoutComponent extends React.Component<IGoldenLayoutComponentProps, IGoldenLayoutComponentState> {

  public state = {
    renderPanels: []
  };

  public containerRef: any = React.createRef();
  private goldenLayoutInstance: any = undefined;
  private goldenlayoutStore: GoldenlayoutStore;

  constructor(props) {
    super(props);
    const {goldenlayoutStore} = props;
    this.goldenlayoutStore = goldenlayoutStore;
  }

  public componentRender(reactComponentHandler: any) {
    this.setState(state => {
      const newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.add(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }

  public componentDestroy(reactComponentHandler: any) {
    this.setState(state => {
      const newRenderPanels = new Set(state.renderPanels);
      newRenderPanels.delete(reactComponentHandler);
      return { renderPanels: newRenderPanels };
    });
  }

  public componentDidMount() {
    this.goldenLayoutInstance = new GoldenLayout(this.goldenlayoutStore.config, this.containerRef.current);

    if (this.props.registerComponents instanceof Function) {
      this.props.registerComponents(this.goldenLayoutInstance);
    }

    this.goldenLayoutInstance.reactContainer = this;
    this.goldenLayoutInstance.init();

    // ensure React and ReactDOM are
    // in the global scope for golden-layout
    (window as any).React = React;
    (window as any).ReactDOM = ReactDOM;
    window.addEventListener('resize', this.onResize);
  }

  public render() {
    const panels = Array.from(this.state.renderPanels || []);
    return (
      <div ref={this.containerRef} style={styles.component}>
        {panels.map((panel, index) => {
          return ReactDOM.createPortal(
            panel._getReactComponent(),
            panel._container.getElement()[0]
          );
        })}
      </div>
    );
  }

  /**
   * Resize event listener.
   */
  private onResize = () => {
    if(this.goldenLayoutInstance) {
      this.goldenLayoutInstance.updateSize();
    }
  }
}



