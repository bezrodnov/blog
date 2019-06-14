import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Container } from "reactstrap";

import ModelStoreContext from "../ModelStoreContext";
import SettingsModal from "./SettingsModal";
import Tooltip from "./Tooltip";

class AppNavBar extends Component {
  state = { showSettings: false };

  render() {
    const { showSettings } = this.state;
    const { labels } = this.props.settings;
    const { path } = this.props;

    const toggleSettings = this.toggle.bind(this, "showSettings");
    return (
      <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
        <Container>
          <Nav navbar>
            <ModelStoreContext.Consumer>
              {({ models }) =>
                models.map(({ modelName }) => (
                  <Tooltip
                    key={modelName}
                    tooltip={labels[`nav.${modelName}s`]}
                    placement="bottom"
                  >
                    <NavItem>
                      <Link
                        to={getPath(modelName)}
                        className={`${modelName} ${
                          path === getPath(modelName) ? "current" : ""
                        }`}
                      />
                    </NavItem>
                  </Tooltip>
                ))
              }
            </ModelStoreContext.Consumer>
          </Nav>
          <div className="global-controls">
            <span
              className="global-control fas fa-cog"
              onClick={toggleSettings}
            />
            <span className="global-control fas fa-sign-out-alt" />
          </div>
        </Container>
        <SettingsModal show={showSettings} requestHide={toggleSettings} />
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
