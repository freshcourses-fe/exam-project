import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

const PublicOnlyRoute = routeProps => {
  const { data, isFetching } = useSelector(state => state.userStore);

  if (isFetching) {
    return <Spinner />;
  }

  if (!data) {
    return <Route {...routeProps} />;
  }

  return <Redirect to='/' />;
};

export default PublicOnlyRoute;
