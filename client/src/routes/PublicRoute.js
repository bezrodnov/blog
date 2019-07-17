import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...other }) => (
  <Route {...other} component={props => isAuthenticated
    ? <Redirect to="/" />
    : <Component {...props} />
  } />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.user,
});

export default connect(mapStateToProps)(PublicRoute);
