import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Container } from "reactstrap";

import ModelUIContext from "../ModelUIContext";
import SettingsModal from "./SettingsModal";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

import Tooltip from "./Tooltip";

class AppNavBar extends Component {
  render() {
    const { labels } = this.props.settings;
    const { path } = this.props;

    return (
      <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
        <Container>
          <Nav navbar>
            <ModelUIContext.Consumer>
              {({ models }) =>
                models.map(({ name }) => (
                  <Tooltip key={name} tooltip={labels.get(`nav.${name}s`)} placement="bottom">
                    <NavItem>
                      <Link to={getPath(name)} className={`${name} ${path === getPath(name) ? "current" : ""}`} />
                    </NavItem>
                  </Tooltip>
                ))
              }
            </ModelUIContext.Consumer>
          </Nav>
          <div className="global-controls">
            <RegisterModal />
            <LoginModal />
            <SettingsModal />
            <Logout />
          </div>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ settings }) => ({ settings });
export default connect(mapStateToProps)(AppNavBar);

const getPath = modelName => `/${modelName}s`;
