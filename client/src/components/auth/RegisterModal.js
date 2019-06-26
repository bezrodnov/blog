import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { connect } from "react-redux";

import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import Tooltip from "./../Tooltip";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      this.setState({
        msg: error.id === "REGISTER_FAIL" ? error.msg : null
      });
    }

    if (isAuthenticated && this.state.modal) {
      this.toggle();
    }
  }

  render() {
    const { modal, msg } = this.state;
    const { settings, isAuthenticated } = this.props;
    const { labels } = settings;
    return (
      <React.Fragment>
        {isAuthenticated ? null : (
          <Tooltip tooltip={labels.get("registerModal.tooltip")}>
            <span className="global-control fas fa-user-plus" onClick={this.toggle} />
          </Tooltip>
        )}
        <Modal className="medic-modal" isOpen={modal} keyboard={true} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.hide}>{labels.get("registerModal.title")}</ModalHeader>
          <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">{labels.get("user.name")}</Label>
                <Input
                  autoFocus={true}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Label for="email">{labels.get("user.email")}</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Label for="password">{labels.get("user.password")}</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                  className="mb-3"
                />
                <Button color="dark" block>
                  {labels.get("registerModal.registerButton")}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    // create user object
    const newUser = { name, email, password };

    this.props.register(newUser);
  };

  toggle = () => {
    // clear errors
    this.props.clearErrors();

    this.setState({ modal: !this.state.modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
