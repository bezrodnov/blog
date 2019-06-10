import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from "reactstrap";

export default class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5 fixed-top">
          <Container>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <Link to="/antibiotics">Antibiotics</Link>
                </NavItem>
                <NavItem>
                  <Link to="/antibioticTypes">Antibiotic Types</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
}
