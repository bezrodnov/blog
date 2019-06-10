import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import { getAntibiotics, deleteAntibiotic } from "../actions/antibioticActions";

import AntibioticModal from "./AntibioticModal";

class AntibioticList extends Component {
  componentDidMount() {
    this.props.getAntibiotics();
  }

  render() {
    const { antibiotics } = this.props.antibiotic;
    return (
      <Container>
        <AntibioticModal />
        <ListGroup>
          <TransitionGroup className="antibiotic-list">
            {antibiotics.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }

  onDeleteClick = id => {
    this.props.deleteAntibiotic(id);
  };
}

AntibioticList.propTypes = {
  getAntibiotics: PropTypes.func.isRequired,
  antibiotic: PropTypes.object.isRequired
};

const mapStateToProps = ({ antibiotic }) => ({
  antibiotic
});

export default connect(
  mapStateToProps,
  { getAntibiotics, deleteAntibiotic }
)(AntibioticList);
