import React, { Component } from "react";
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

import { addAntibioticType } from "../actions/antibioticTypeActions";

class AntibioticTypeModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Antibiotic Type
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>Add Antibiotic Type</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Add antibiotic type"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Save
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.addAntibioticType({ name: this.state.name });
    this.toggle();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
}

const mapStateToProps = state => ({
  antibioticType: state.antibioticType
});

export default connect(
  mapStateToProps,
  { addAntibioticType }
)(AntibioticTypeModal);
