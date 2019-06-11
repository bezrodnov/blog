import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ModelModal extends Component {
  render() {
    return null;
  }
}

ModelModal.propTypes = {
  model: PropTypes.object,
  fields: PropTypes.object.isRequired
};

export default ModelModal;
