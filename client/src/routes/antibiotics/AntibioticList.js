import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import { deleteAntibiotic } from "../../actions/antibioticActions";

import AntibioticModal from "./AntibioticModal";

class AntibioticList extends Component {
  state = {
    showModal: false
  };

  render() {
    const { antibiotics } = this.props.antibiotic;
    const { labels } = this.props.settings;
    const { showModal, selectedAntibiotic } = this.state;

    const antibioticsByType = groupAntibioticsByType(antibiotics);
    return (
      <div className="page">
        <Container>
          <AntibioticModal
            show={showModal}
            antibiotic={selectedAntibiotic}
            requestHide={this.hideModal}
          />
          <ListGroup>
            {antibioticsByType.map(({ type, antibiotics }) => (
              <div key={type} className="model-list-group">
                <TransitionGroup className="model-list">
                  {antibiotics.map(antibiotic => {
                    const { _id, name } = antibiotic;
                    return (
                      <CSSTransition key={_id} timeout={500} classNames="fade">
                        <ListGroupItem
                          onClick={this.showModal.bind(this, antibiotic)}
                        >
                          <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={e => this.onDeleteClick(e, _id)}
                          >
                            <span className="fas fa-times" />
                          </Button>
                          {name}
                        </ListGroupItem>
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              </div>
            ))}
            <Button block onClick={this.showModal.bind(this, null)}>
              {labels["global.add"]}
            </Button>
          </ListGroup>
        </Container>
      </div>
    );
  }

  onDeleteClick(e, id) {
    e.stopPropagation();
    this.props.deleteAntibiotic(id);
  }

  showModal(selectedAntibiotic) {
    this.setState({ showModal: true, selectedAntibiotic });
  }

  hideModal = () => {
    this.setState({ showModal: false, selectedAntibiotic: null });
  };
}

AntibioticList.propTypes = {
  antibiotic: PropTypes.object.isRequired
};

const mapStateToProps = ({ antibiotic, settings }) => ({
  antibiotic,
  settings
});

export default connect(
  mapStateToProps,
  { deleteAntibiotic }
)(AntibioticList);

const groupAntibioticsByType = antibiotics => {
  const types = antibiotics.reduce((types, antibiotic) => {
    const type = antibiotic.type.name;
    types[type] = types[type] || [];
    types[type].push(antibiotic);
    return types;
  }, {});

  return Object.keys(types)
    .sort()
    .map(type => ({
      type,
      antibiotics: types[type].sort((a, b) => a.name.localeCompare(b.name))
    }));
};
