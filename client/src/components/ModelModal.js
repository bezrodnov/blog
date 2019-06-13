import React, { Component } from "react";
import PropTypes from "prop-types";
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

export default class ModelModal extends Component {
  state = {};

  static getDerivedStateFromProps(props, state) {
    const { modelName, model, labels, show } = props;
    if (!show) {
      return { show };
    }

    const name = (state.show && state.name) || (model ? model.name : "");
    const title =
      labels[
        `${modelName}.${model && model._id ? "update" : "create"}Modal.title`
      ];
    return { name, title, show };
  }

  render() {
    const { modelName, labels, fields, childModels } = this.props;
    const { title, name, show } = this.state;
    return (
      <Modal isOpen={show} keyboard={true} toggle={this.hide}>
        <ModalHeader toggle={this.hide}>{title}</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="name">{labels[`${modelName}.name`]}</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder={labels[`${modelName}.name.placeholder`]}
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
    const values = { name };

    if (this.props.model && this.props.model._id) {
      this.props.updateAction({ ...this.props.model, ...values });
    } else {
      this.props.createAction(values);
    }
    this.hide();
  };

  hide = () => {
    this.props.requestHide();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

ModelModal.propTypes = {
  modelName: PropTypes.string.isRequired,
  model: PropTypes.object,
  show: PropTypes.bool,
  labels: PropTypes.object.isRequired,
  requestHide: PropTypes.func.isRequired
};
