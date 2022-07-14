import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import { useDispatch } from 'react-redux';
import { authActionRefresh } from './actions/actionCreator';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';
import PublicOnlyRoute from './components/Routes/PublicOnlyRoute/PublicOnlyRoute';

function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (refreshToken) {
      dispatch(authActionRefresh(refreshToken));
    }
  }, []);

  return (
    <Router history={browserHistory}>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <PublicOnlyRoute exact path='/login' component={LoginPage} />
        <PublicOnlyRoute
          exact
          path='/registration'
          component={RegistrationPage}
        />
        <PrivateRoute exact path='/payment' component={Payment} />
        <PrivateRoute exact path='/startContest' component={StartContestPage} />
        <PrivateRoute exact roles={[CONSTANTS.CUSTOMER]} path='/startContest/nameContest'>
          <ContestCreationPage
            contestType={CONSTANTS.NAME_CONTEST}
            title='Company Name'
          />
        </PrivateRoute>
        <PrivateRoute exact roles={[CONSTANTS.CUSTOMER]} path='/startContest/taglineContest'>
          <ContestCreationPage
            contestType={CONSTANTS.TAGLINE_CONTEST}
            title='TAGLINE'
          />
        </PrivateRoute>
        <PrivateRoute exact roles={[CONSTANTS.CUSTOMER]} path='/startContest/logoContest'>
          <ContestCreationPage
            contestType={CONSTANTS.LOGO_CONTEST}
            title='LOGO'
          />
        </PrivateRoute>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/contest/:id' component={ContestPage} />
        <PrivateRoute exact path='/account' component={UserProfile} />
        <Route component={NotFound} />
      </Switch>
      <ChatContainer />
    </Router>
  );
}

export default App;
