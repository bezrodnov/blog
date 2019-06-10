import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import { getAntibiotics, deleteAntibiotic } from "../actions/antibioticActions";

import AntibioticModal from "./AntibioticModal";

class AntibioticList extends Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    this.props.getAntibiotics();
  }

  render() {
    const { antibiotics } = this.props.antibiotic;
    const { labels } = this.props.i18n;
    const { showModal, selectedAntibiotic } = this.state;
    return (
      <div className="page">
        <Container>
          <AntibioticModal
            show={showModal}
            antibiotic={selectedAntibiotic}
            requestHide={this.hideModal}
          />
          <ListGroup>
            <TransitionGroup className="antibiotic-list">
              {antibiotics.map(antibiotic => {
                const { _id, name } = antibiotic;
                return (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        <span className="fas fa-times" />
                      </Button>
                      <span
                        className="model-list-item"
                        onClick={this.showModal.bind(this, antibiotic)}
                      >
                        {name}
                      </span>
                    </ListGroupItem>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
            <Button block onClick={this.showModal.bind(this, null)}>
              {labels["global.add"]}
            </Button>
          </ListGroup>
        </Container>
      </div>
    );
  }

  onDeleteClick = id => {
    this.props.deleteAntibiotic(id);
  };

  showModal(selectedAntibiotic) {
    this.setState({ showModal: true, selectedAntibiotic });
  }

  hideModal = () => {
    this.setState({ showModal: false, selectedAntibiotic: null });
  };
}

AntibioticList.propTypes = {
  getAntibiotics: PropTypes.func.isRequired,
  antibiotic: PropTypes.object.isRequired
};

const mapStateToProps = ({ antibiotic, i18n }) => ({
  antibiotic,
  i18n
});

export default connect(
  mapStateToProps,
  { getAntibiotics, deleteAntibiotic }
)(AntibioticList);
