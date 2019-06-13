import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class LoadingMask extends Component {
  render() {
    return ReactDOM.createPortal(
      <div className="loading-mask">
        <div>
          <div />
          <div />
          <div />
        </div>
      </div>,
      document.body
    );
  }
}
