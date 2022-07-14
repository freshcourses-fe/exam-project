import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import styles from './BackButton.module.sass';

const BackButton = (props) => {
  const history = useHistory();
  function clickHandler() {
    history.goBack();
  }

  return (
    <div onClick={clickHandler} className={styles.buttonContainer}>
      <span>Back</span>
    </div>
  );
};

export default withRouter(BackButton);
