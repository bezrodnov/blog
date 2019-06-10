import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";

export default class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Test</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="">TEST</NavLink>
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
