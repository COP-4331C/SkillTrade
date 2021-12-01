/**
 *
 * PrivateRoutes
 *
 */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Utils

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
    <Route {...rest} render={props => (
      token !== null ? (
        < Component  {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}
        />
      )
    )}
    />
  )
};


export default PrivateRoutes;