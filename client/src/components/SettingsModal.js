import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";

import { switchLocale } from "../actions/settingsActions";

import Tooltip from "./Tooltip";

class SettingsModal extends Component {
  state = {
    modal: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    settings: PropTypes.object
  };

  render() {
    const { isAuthenticated } = this.props;
    const { locales, locale, labels } = this.props.settings;
    return (
      <React.Fragment>
        {isAuthenticated ? (
          <Tooltip tooltip={labels.get("nav.settings")}>
            <span className="global-control fas fa-cog" onClick={this.toggle} />
          </Tooltip>
        ) : null}
        <Modal className="medic-modal" isOpen={this.state.modal} keyboard={true} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>{labels.get("settingsModal.title")}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.toggle}>
              <FormGroup>
                <Label for="locale">{labels.get("settingsModal.locale")}</Label>
                <Input type="select" name="locale" id="locale" autoFocus={true} onChange={this.onChange} value={locale}>
                  {locales.map(locale => (
                    <option key={locale} value={locale}>
                      {labels.get(`locale.${locale}`)}
                    </option>
                  ))}
                </Input>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  {labels.get("global.close")}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { switchLocale }
)(SettingsModal);
