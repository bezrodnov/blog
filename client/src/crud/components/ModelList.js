import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ModelModal from "./ModelModal";

class ModelList extends Component {
  state = {
    showModal: false
  };

  render() {
    const { modelName, settings, createAction, updateAction } = this.props;
    const { labels } = settings;
    const items = this.props[modelName][modelName + "s"];

    const { showModal, selected } = this.state;
    return (
      <div className="page">
        <Container>
          <ModelModal
            modelName={modelName}
            model={selected}
            labels={labels}
            show={showModal}
            requestHide={this.hideModal}
            createAction={createAction}
            updateAction={updateAction}
          />
          <ListGroup>
            <div className={`model-list-group ${modelName}-model-list-group`}>
              <TransitionGroup className="model-list">
                {items.map(item => {
                  const { _id, name } = item;
                  return (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <ListGroupItem onClick={this.showModal.bind(this, item)}>
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
    this.props.deleteAction(id);
  }

  showModal(selected) {
    this.setState({ showModal: true, selected });
  }

  hideModal = () => {
    this.setState({ showModal: false, selected: null });
  };
}

ModelList.propTypes = {
  modelName: PropTypes.string.isRequired,
  createAction: PropTypes.func.isRequired,
  updateAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired
};

export default ModelList;
