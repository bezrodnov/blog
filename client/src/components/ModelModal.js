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
    const { modelName, fields, labels, show } = props;
    if (!show) {
      // don't change modal state when it is hidden or become hidden
      // (to prevent glitches and unnecessary updates)
      return { show };
    }
    const model = props.model || {};
    // prettier-ignore
    const title = labels[`${modelName}.${model._id ? "update" : "create"}Modal.title`];
    const derivedState = { show, title, values: {} };

    fields.forEach(field => {
      const value =
        (state.show && state.values[field.name]) ||
        (model[field.name] &&
          (field.type === "Embedded"
            ? model[field.name]._id
            : model[field.name]));
      derivedState.values[field.name] = value || "";
    });

    return derivedState;
  }

  render() {
    const { labels, fields } = this.props;
    const { title, show } = this.state;
    return (
      <Modal isOpen={show} keyboard={true} toggle={this.hide} autoFocus={false}>
        <ModalHeader toggle={this.hide}>{title}</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              {fields.map(this.renderField)}
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {labels["global.save"]}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  renderField = ({ name, type, ref }, index) => {
    const { modelName, childModels, labels } = this.props;
    const { values = {} } = this.state;
    let field;
    switch (type) {
      case "String":
        field = (
          <Input
            type="text"
            name={name}
            id={name}
            autoFocus={index === 0}
            placeholder={labels[`${modelName}.${name}.placeholder`]}
            onChange={this.onChange}
            value={values[name]}
          />
        );
        break;
      case "Embedded":
        const childModel = childModels[ref];
        if (!childModel || !childModel.items) {
          console.error(`child model not found for field ${field.name}`);
          return null;
        }
        field = (
          <Input
            type="select"
            name={name}
            id={name}
            onChange={this.onChange}
            value={values[name]}
          >
            <option key="empty" value="" />
            {childModel.items.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </Input>
        );
        break;
      default:
        return null;
    }
    return (
      <React.Fragment key={name}>
        <Label for={name}>{labels[`${modelName}.${name}`]}</Label>
        {field}
      </React.Fragment>
    );
  };

  onSubmit = e => {
    e.preventDefault();
    const { values } = this.state;

    if (this.props.model && this.props.model._id) {
      this.props.updateAction({ _id: this.props.model._id, ...values });
    } else {
      this.props.createAction(values);
    }
    this.hide();
  };

  hide = () => {
    this.props.requestHide();
  };

  onChange = e => {
    const { values } = this.state;
    this.setState({
      values: {
        ...values,
        [e.target.name]: e.target.value
      }
    });
  };
}

ModelModal.propTypes = {
  modelName: PropTypes.string.isRequired,
  model: PropTypes.object,
  show: PropTypes.bool,
  labels: PropTypes.object.isRequired,
  requestHide: PropTypes.func.isRequired
};
