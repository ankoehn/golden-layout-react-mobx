import * as React from "react";
import {inject, observer} from "mobx-react";
import FirstStore from '../store/firstStore'
import SecondStore from '../store/secondStore'

const styles = {
  component: {
    padding: "10px"
  },
  title: {
    color: "orange",
  },
  context: {
    paddingTop: "25px",
    color: "white"
  },
  btn: {
    marginLeft: "10px"
  }
};


interface ISecondGoldenPanelProps {
  firstStore: FirstStore;
  secondStore: SecondStore;
  glContainer: any;
  value: string;
}

@inject('firstStore')
@inject('secondStore')
@observer
export class SecondGoldenPanel extends React.Component<ISecondGoldenPanelProps, {}> {

  private firstStore: FirstStore;
  private secondStore: SecondStore;

  constructor(props) {
    super(props);
    const {firstStore, secondStore} = props;
    this.firstStore = firstStore;
    this.secondStore = secondStore;

  }

  private setValue = (e: any) => {
    this.secondStore.setValue(e.target.value);
  };

  private setContainerTitle = () => {
    this.props.glContainer.setTitle(this.secondStore.value);
  };

  public render() {
    return (
      <div>
        <div style={styles.component}>
          <p style={styles.title}><b>This is my second panel.</b>
          </p>
          <input type="text" value={this.secondStore.value} onChange={this.setValue}/>
          <button onClick={this.setContainerTitle} style={styles.btn}>Set Title</button>
          <div style={styles.context}>Value from the firstStore: {this.firstStore.value}</div>
        </div>
      </div>
    );
  }
}
