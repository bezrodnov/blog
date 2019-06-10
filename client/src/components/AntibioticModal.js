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

import { addAntibiotic } from "../actions/antibioticActions";

class AntibioticModal extends Component {
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
          Add Antibiotic
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>Add Antibiotic</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Add antibiotic"
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
    this.props.addAntibiotic({ name: this.state.name });
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
  antibiotic: state.antibiotic
});

export default connect(
  mapStateToProps,
  { addAntibiotic }
)(AntibioticModal);
