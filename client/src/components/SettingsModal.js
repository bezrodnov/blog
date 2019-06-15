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

import { switchLocale } from "../actions/settingsActions";

class SettingsModal extends Component {
  render() {
    const { locales, locale, labels } = this.props.settings;
    return (
      <Modal
        className="medic-modal"
        isOpen={this.props.show}
        keyboard={true}
        toggle={this.hide}
        autoFocus={false}
      >
        <ModalHeader toggle={this.hide}>
          {labels["settingsModal.title"]}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.hide}>
            <FormGroup>
              <Label for="locale">{labels["settingsModal.locale"]}</Label>
              <Input
                type="select"
                name="locale"
                id="locale"
                autoFocus={true}
                onChange={this.onChange}
                value={locale}
              >
                {locales.map(locale => (
                  <option key={locale} value={locale}>
                    {labels[`locale.${locale}`]}
                  </option>
                ))}
              </Input>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {labels["global.close"]}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  hide = e => {
    e && e.preventDefault();
    this.props.requestHide();
  };

  onChange = e => {
    switch (e.target.name) {
      case "locale":
        this.props.switchLocale(e.target.value);
        break;
      default:
        break;
    }
  };
}

SettingsModal.propTypes = {
  show: PropTypes.bool,
  requestHide: PropTypes.func.isRequired,
  settings: PropTypes.object
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { switchLocale }
)(SettingsModal);
