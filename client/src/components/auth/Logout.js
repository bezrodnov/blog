import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions";

import Tooltip from "../Tooltip";

class Logout extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    labels: PropTypes.object
  };

  render() {
    if (!this.props.isAuthenticated) {
      return null;
    }
    return (
      <Tooltip tooltip={this.props.labels.get("nav.logout")}>
        <span className="global-control fas fa-sign-out-alt" onClick={this.props.logout} />
      </Tooltip>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  labels: state.settings.labels
});

export default connect(
  mapStateToProps,
  { logout }
)(Logout);
