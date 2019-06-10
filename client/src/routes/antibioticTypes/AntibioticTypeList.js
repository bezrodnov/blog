import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import {
  getAntibioticTypes,
  deleteAntibioticType
} from "../../actions/antibioticTypeActions";

import AntibioticTypeModal from "./AntibioticTypeModal";

class AntibioticTypeList extends Component {
  componentDidMount() {
    this.props.getAntibioticTypes();
  }

  render() {
    const { antibioticTypes = [] } = this.props.antibioticType;
    return (
      <div className="page">
        <Container>
          <AntibioticTypeModal />
          <ListGroup>
            <TransitionGroup className="antibiotic-type-list">
              {antibioticTypes.map(({ _id, name }) => (
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
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }

  onDeleteClick = id => {
    this.props.deleteAntibioticType(id);
  };
}

AntibioticTypeList.propTypes = {
  getAntibioticTypes: PropTypes.func.isRequired,
  antibioticType: PropTypes.object.isRequired
};

const mapStateToProps = ({ antibioticType }) => ({
  antibioticType
});

export default connect(
  mapStateToProps,
  { getAntibioticTypes, deleteAntibioticType }
)(AntibioticTypeList);
