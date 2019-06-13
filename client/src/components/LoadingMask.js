import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

export default class LoadingMask extends Component {
  render() {
    return ReactDOM.createPortal(
      this.props.show && (
        <CSSTransition classNames="fade" timeout={1000}>
          <div className="loading-mask">
            <div>
              <div />
              <div />
              <div />
            </div>
          </div>
        </CSSTransition>
      ),
      document.body
    );
  }
}
