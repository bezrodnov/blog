import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Scrollbars } from "react-custom-scrollbars";

import ModelModal from "./ModelModal";

class ModelList extends Component {
  state = {
    showModal: false
  };

  render() {
    const { model, modelName, settings, createAction, updateAction, fields, childModels } = this.props;
    const { labels, locale } = settings;
    const { items } = model;

    const { showModal, selected } = this.state;
    return (
      <div className="page model-list">
        <Container className="toolbar">
          <Button block onClick={this.showModal.bind(this, null)} color="dark">
            {labels.get("global.add")}
          </Button>
        </Container>
        <Scrollbars className="custom-scroll-bars">
          <Container>
            <ListGroup>
              <div className={`model-list-group ${modelName}-model-list-group`}>
                <TransitionGroup className="model-list">
                  {items.map(item => {
                    const { _id, displayName } = item;
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
                          {displayName}
                        </ListGroupItem>
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              </div>
            </ListGroup>
          </Container>
        </Scrollbars>
        <ModelModal
          modelName={modelName}
          model={selected}
          labels={labels}
          locale={locale}
          show={showModal}
          requestHide={this.hideModal}
          createAction={createAction}
          updateAction={updateAction}
          fields={fields}
          childModels={childModels}
        />
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
