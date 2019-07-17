import React from 'react';
import { connect } from 'react-redux';

import MessageBox from './MessageBox';

import { generateAction, CLEAR_ERROR } from '../redux/actions';

function Notifications(props) {
  return (
    <React.Fragment>
      <MessageBox
        variant="error"
        open={!!props.error}
        onClose={props.clearError}
        message={props.error}
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  error: state.error.message,
});

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(generateAction(CLEAR_ERROR)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);