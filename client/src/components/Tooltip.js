import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip as BootstrapTooltip } from "reactstrap";

export default class Tooltip extends Component {
  state = { isOpen: false };

  render() {
    const { tooltip, children, className, style, ...other } = this.props;
    return (
      <React.Fragment>
        <span ref={this.onChildRef} className={className} style={style}>
          {children}
        </span>
        {this.state.target ? (
          <BootstrapTooltip
            {...other}
            isOpen={this.state.isOpen}
            toggle={this.toggle}
            target={this.state.target}
          >
            {tooltip}
          </BootstrapTooltip>
        ) : null}
      </React.Fragment>
    );
  }

  onChildRef = ref => {
    this.setState({ target: ref });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
}

Tooltip.propTypes = {
  tooltip: PropTypes.string.isRequired
};
