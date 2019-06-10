import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import { addAntibiotic } from "../../actions/antibioticActions";
import { getAntibioticTypes } from "../../actions/antibioticTypeActions";

const initialState = {
  name: "",
  type: ""
};

class AntibioticModal extends Component {
  state = initialState;

  static getDerivedStateFromProps(props, state) {
    const { antibiotic } = props;
    return {
      name: state.name || (antibiotic ? antibiotic.name : ""),
      type: state.type || (antibiotic ? antibiotic.type._id : ""),
      isNew: antibiotic && antibiotic._id
    };
  }

  componentDidMount() {
    // TODO: probably move this to the top component, since this is kinda global info
    this.props.getAntibioticTypes();
  }

  render() {
    const { labels } = this.props.i18n;
    const { antibioticTypes } = this.props.antibioticType;
    const { isNew, name, type } = this.state;
    return (
      <Modal isOpen={this.props.show} keyboard={true} toggle={this.hide}>
        <ModalHeader toggle={this.hide}>
          {labels["antibiotic.addModal.title"]}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="name">{labels["antibiotic.name"]}</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder={labels["antibiotic.addModal.name.placeholder"]}
                onChange={this.onChange}
                value={name}
              />
              <Label for="type">{labels["antibiotic.type"]}</Label>
              <Input
                type="select"
                name="type"
                id="type"
                onChange={this.onChange}
                value={type}
              >
                <option key="empty" value="" />
                {antibioticTypes.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </Input>
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {labels["global.save"]}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, type } = this.state;
    this.props.addAntibiotic({ name, type });
    this.hide();
  };

  hide = () => {
    this.setState(initialState);
    this.props.requestHide();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

AntibioticModal.propTypes = {
  show: PropTypes.bool,
  requestHide: PropTypes.func.isRequired,
  antibiotic: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.object
  })
};

const mapStateToProps = ({ antibioticType, i18n }) => ({
  antibioticType,
  i18n
});

export default connect(
  mapStateToProps,
  { addAntibiotic, getAntibioticTypes }
)(AntibioticModal);
