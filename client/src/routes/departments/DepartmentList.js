import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";

import {
  getDepartments,
  deleteDepartment
} from "../../actions/departmentActions";

import DepartmentModal from "./DepartmentModal";

class DepartmentList extends Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    this.props.getDepartments();
  }

  render() {
    const { departments } = this.props.department;
    const { labels } = this.props.i18n;
    const { showModal, selectedDepartment } = this.state;

    return (
      <div className="page">
        <Container>
          <DepartmentModal
            show={showModal}
            department={selectedDepartment}
            requestHide={this.hideModal}
          />
          <ListGroup>
            <div className="model-list-group">
              <TransitionGroup className="model-list">
                {departments.map(department => {
                  const { _id, name } = department;
                  return (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <ListGroupItem
                        onClick={this.showModal.bind(this, department)}
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
    this.props.deleteDepartment(id);
  }

  showModal(selectedDepartment) {
    this.setState({ showModal: true, selectedDepartment });
  }

  hideModal = () => {
    this.setState({ showModal: false, selectedDepartment: null });
  };
}

DepartmentList.propTypes = {
  getDepartments: PropTypes.func.isRequired,
  department: PropTypes.object.isRequired
};

const mapStateToProps = ({ department, i18n }) => ({
  department,
  i18n
});

export default connect(
  mapStateToProps,
  { getDepartments, deleteDepartment }
)(DepartmentList);
