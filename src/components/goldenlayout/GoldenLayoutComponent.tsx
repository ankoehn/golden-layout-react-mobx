import * as React from "react";
import * as ReactDOM from "react-dom";
import * as GoldenLayout from "golden-layout";
import "./goldenLayoutDependencies";
import "./patchReactComponentHandler";
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-dark-theme.css";

interface IGoldenLayoutComponentState {
  renderPanels: any;
}

export class GoldenLayoutComponent extends React.Component<any, IGoldenLayoutComponentState> {

  public state = {
    renderPanels: []
  };

  public containerRef: any = React.createRef();
  private goldenLayoutInstance: any = undefined;

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
    this.goldenLayoutInstance = new GoldenLayout(
      this.props.config || {},
      this.containerRef.current
    );
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
      <div ref={this.containerRef} {...this.props.htmlAttrs}>
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



