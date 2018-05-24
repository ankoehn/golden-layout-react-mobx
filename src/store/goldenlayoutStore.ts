import {observable} from "mobx";

export default class GoldenLayoutStore {

  @observable public config: any = {
    settings: {
      showPopoutIcon: false // disable popout function
    },
    content: [
      {
        content: [
          {
            component: "firstItem",
            title: "A react component",
            type: "react-component",
            width: 20
          },
          {
            component: "secondItem",
            title: "Another react component",
            type: "react-component",
          }],
        type: "row"
      }
    ]
  };
}