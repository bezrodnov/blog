import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Container } from "reactstrap";

import ModelUIContext from "../ModelUIContext";
import SettingsModal from "./SettingsModal";
import Tooltip from "./Tooltip";

class AppNavBar extends Component {
  state = { showSettings: false };
  toggleShowSettings = this.toggle.bind(this, "showSettings");

  render() {
    const { showSettings } = this.state;
    const { labels } = this.props.settings;
    const { path } = this.props;

    return (
      <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
        <Container>
          <Nav navbar>
            <ModelUIContext.Consumer>
              {({ models }) =>
                models.map(({ name }) => (
                  <Tooltip
                    key={name}
                    tooltip={labels[`nav.${name}s`]}
                    placement="bottom"
                  >
                    <NavItem>
                      <Link
                        to={getPath(name)}
                        className={`${name} ${
                          path === getPath(name) ? "current" : ""
                        }`}
                      />
                    </NavItem>
                  </Tooltip>
                ))
              }
            </ModelUIContext.Consumer>
          </Nav>
          <div className="global-controls">
            <span
              className="global-control fas fa-cog"
              onClick={this.toggleShowSettings}
            />
            <span className="global-control fas fa-sign-out-alt" />
          </div>
        </Container>
        <SettingsModal
          show={showSettings}
          requestHide={this.toggleShowSettings}
        />
      </Navbar>
    );
  }

  toggle(prop) {
    this.setState({ [prop]: !this.state[prop] });
  }
}

const mapStateToProps = ({ settings }) => ({ settings });
export default connect(mapStateToProps)(AppNavBar);

const getPath = modelName => `/${modelName}s`;
