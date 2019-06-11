import { Component } from "react";
import { connect } from "react-redux";

import { getAntibiotics } from "../actions/antibioticActions";
import { getAntibioticTypes } from "../actions/antibioticTypeActions";
import { getDepartments } from "../actions/departmentActions";

class GlobalDataLoader extends Component {
  componentDidMount() {
    // Load Global Data
    this.props.getAntibiotics();
    this.props.getAntibioticTypes();
    this.props.getDepartments();
  }

  render() {
    return null;
  }
}

export default connect(
  () => ({}),
  { getAntibioticTypes, getAntibiotics, getDepartments }
)(GlobalDataLoader);
