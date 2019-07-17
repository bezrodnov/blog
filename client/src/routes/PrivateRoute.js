import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

const PrivateRoute = ({ isAuthenticated, component: Component, ...other }) => (
  <Route {...other} component={(props) => !isAuthenticated
    ? <Redirect to="/auth" />
    : (
      <React.Fragment>
        <Header />
        <Component {...props} />
      </React.Fragment>
    )
  } />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.user,
});

export default connect(mapStateToProps)(PrivateRoute);
