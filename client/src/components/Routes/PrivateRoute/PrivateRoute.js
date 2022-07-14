import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

const PrivateRoute = ({ roles , ...routeProps }) => {
  const { data, isFetching } = useSelector(state => state.userStore);

  if (isFetching) {
    return <Spinner />;
  }

  if (data && (!roles || roles.includes(data.role))) {
    return <Route {...routeProps} />;
  }

  return <Redirect to='/' />;
};

export default PrivateRoute;
