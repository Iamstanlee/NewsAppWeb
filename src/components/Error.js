import React from 'react';

const styles = {
  err: {
    margin: '40vh auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '4px'
  }
};

const error = props => {
  return (
    <div style={styles.err}>
      <span>{props.message}</span>
      <span onClick={props.tryReload}>Retry</span>
    </div>
  );
};

export default error;
