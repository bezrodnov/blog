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
import DayPickerInput from "react-day-picker/DayPickerInput";

import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";

import Tooltip from "./Tooltip";

import "moment/locale/en-gb";
import "moment/locale/ru";
import "react-day-picker/lib/style.css";

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
      <Modal
        className="model-modal"
        isOpen={show}
        keyboard={true}
        toggle={this.hide}
        autoFocus={false}
      >
        <ModalHeader toggle={this.hide}>{title}</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              {fields.map(this.renderField)}
              <Button color="dark" block>
                {labels["global.save"]}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  renderField = ({ name, type, ref, required }, index) => {
    const { modelName, childModels, labels, locale } = this.props;
    const { values = {} } = this.state;

    const fieldProps = {
      name,
      id: name,
      value: values[name],
      autoFocus: index === 0,
      autoComplete: "off"
    };

    let field;
    switch (type) {
      case "String":
        field = (
          <Input
            type="text"
            placeholder={labels[`${modelName}.${name}.placeholder`]}
            onChange={this.onChange}
            {...fieldProps}
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
          <Input type="select" onChange={this.onChange} {...fieldProps}>
            <option key="empty" value="" />
            {childModel.items.map(({ _id, name }) => (
              <option key={_id} value={_id}>
                {name}
              </option>
            ))}
          </Input>
        );
        break;
      case "Date":
        field = (
          <DayPickerInput
            {...fieldProps}
            formatDate={formatDate}
            parseDate={parseDate}
            format="DD-MM-YYYY"
            placeholder={formatDate(new Date(), "DD-MM-YYYY", locale)}
            dayPickerProps={{
              locale,
              localeUtils: MomentLocaleUtils
            }}
            inputProps={{ className: "form-control" }}
          />
        );
        break;
      default:
        return null;
    }
    return (
      <React.Fragment key={name}>
        <Label for={name}>{labels[`${modelName}.${name}`]}</Label>
        <Tooltip
          tooltip={labels["field.requiredIndicator"]}
          className="required-indicator"
          style={{ display: required ? "" : "none" }}
        />
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
