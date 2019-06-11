import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from "reactstrap";

import SettingsModal from "./SettingsModal";

class AppNavBar extends Component {
  state = {
    isOpen: false,
    showSettings: false
  };

  render() {
    const { showSettings, isOpen } = this.state;
    const { labels } = this.props.i18n;

    const toggleSettings = this.toggle.bind(this, "showSettings");
    const toggleNavbar = this.toggle.bind(this, "isOpen");
    return (
      <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
        <Container>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link to="/antibiotics">{labels["nav.antibiotics"]}</Link>
              </NavItem>
              <NavItem>
                <Link to="/antibioticTypes">
                  {labels["nav.antibioticTypes"]}
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/departments">{labels["nav.departments"]}</Link>
              </NavItem>
            </Nav>
            <div className="global-controls">
              <span
                className="global-control fas fa-cog"
                onClick={toggleSettings}
              />
              <span className="global-control fas fa-sign-out-alt" />
            </div>
          </Collapse>
        </Container>
        <SettingsModal show={showSettings} requestHide={toggleSettings} />
      </Navbar>
    );
  }

  toggle(prop) {
    this.setState({ [prop]: !this.state[prop] });
  }
}

const mapStateToProps = ({ i18n }) => ({ i18n });
export default connect(mapStateToProps)(AppNavBar);
