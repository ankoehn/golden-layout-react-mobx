import * as React from "react";
import * as GoldenLayout from "golden-layout";

/**
 * Support React 16 New Context API:
 * see https://github.com/golden-layout/golden-layout/issues/392#issuecomment-384731510
 * see https://codesandbox.io/s/kw4pro8k27
 * from Philipp Munin (pmunin)
 */

const ReactComponentHandler = GoldenLayout["__lm"].utils.ReactComponentHandler;

class ReactComponentHandlerPatched extends ReactComponentHandler {
  private _render() {
    const reactContainer = this._container.layoutManager.reactContainer; // Instance of GoldenLayoutComponent class
    if (reactContainer && reactContainer.componentRender) {
      reactContainer.componentRender(this);
    }
  }
  private _destroy() {
    // ReactDOM.unmountComponentAtNode( this._container.getElement()[ 0 ] );
    this._container.off("open", this._render, this);
    this._container.off("destroy", this._destroy, this);
  }

  private _getReactComponent() {
    // the following method is absolute copy of the original, provided to prevent depenency on window.React
    const defaultProps = {
      glEventHub: this._container.layoutManager.eventHub,
      glContainer: this._container
    };
    const props = $.extend(defaultProps, this._container._config.props);
    return React.createElement(this._reactClass, props);
  }
}

// Patching internal GoldenLayout.__lm.utils.ReactComponentHandler:
GoldenLayout["__lm"].utils.ReactComponentHandler = ReactComponentHandlerPatched;
