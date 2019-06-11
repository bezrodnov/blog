import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { addDepartment } from "../../actions/departmentActions";

const initialState = {
  name: ""
};

class DepartmentModal extends Component {
  state = initialState;

  static getDerivedStateFromProps(props, state) {
    const { department } = props;
    return {
      name: state.name || (department ? department.name : ""),
      isNew: department && department._id
    };
  }

  render() {
    const { labels } = this.props.settings;
    const { isNew, name } = this.state;
    return (
      <Modal isOpen={this.props.show} keyboard={true} toggle={this.hide}>
        <ModalHeader toggle={this.hide}>
          {labels["department.addModal.title"]}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="name">{labels["department.name"]}</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder={labels["department.addModal.name.placeholder"]}
                onChange={this.onChange}
                value={name}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {labels["global.save"]}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    this.props.addDepartment({ name });
    this.hide();
  };

  hide = () => {
    this.setState(initialState);
    this.props.requestHide();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

DepartmentModal.propTypes = {
  show: PropTypes.bool,
  requestHide: PropTypes.func.isRequired,
  department: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.object
  })
};

const mapStateToProps = ({ settings }) => ({
  settings
});

export default connect(
  mapStateToProps,
  { addDepartment }
)(DepartmentModal);
