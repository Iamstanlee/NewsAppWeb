import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = props =>
  props.show ? <div className={classes.backdrop} onClick={props.onClick} /> : <div />;

export default backdrop;
