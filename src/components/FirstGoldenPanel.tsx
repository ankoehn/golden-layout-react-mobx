import * as React from "react";
import {inject, observer} from "mobx-react";
import FirstStore from '../store/firstStore'

const styles = {
  component: {
    padding: "10px"
  },
  title: {
    color: "orange",
  },
  btn: {
    marginLeft: "10px"
  }
};

interface IFirstGoldenPanelProps {
  firstStore: FirstStore;
  glContainer: any;
  value: string;
}

@inject('firstStore')
@observer
export class FirstGoldenPanel extends React.Component<IFirstGoldenPanelProps, {}> {

  private firstStore: FirstStore;

  constructor(props) {
    super(props);
    const {firstStore} = props;
    this.firstStore = firstStore;
  }

  private setValue = (e: any) => {
    this.firstStore.setValue(e.target.value);
  };

  private setContainerTitle = () => {
    this.props.glContainer.setTitle(this.firstStore.value);
  };

  public render() {
    return (
      <div>
        <div style={styles.component}>
          <p style={styles.title}><b>This is my first panel. It uses the has the firstStore injected</b></p>
          <input type="text" value={this.firstStore.value} onChange={this.setValue}/>
          <button onClick={this.setContainerTitle} style={styles.btn}>Set title</button>
        </div>
      </div>
    );
  }
}
